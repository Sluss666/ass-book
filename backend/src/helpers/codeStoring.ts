type CodeData = {
    code: string,
    expiresAt: number
}

const codeMap = new Map<string,CodeData>()

export function storeCode(identifier: string, code:string, secondsTillExp:number = 300):Boolean{
    const expiresAt = Date.now() + secondsTillExp * 1000
    if(codeMap.set(identifier, {code, expiresAt})) return true
    return false
}

export function verifyCode(identifier:string, inputCode:string):boolean {
    const data = codeMap.get(identifier)
    if(!data) return false
    if(Date.now() > data.expiresAt){
        codeMap.delete(identifier)
        return false
    }
    const isValid = data.code === inputCode
    if(isValid) codeMap.delete(identifier)
    return isValid
}