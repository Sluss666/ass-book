import twilio from 'twilio'

const accSid = process.env.TWILIO_ACCOUNT_SID!
const authToken = process.env.TWILIO_AUTH_TOKEN!
const client = twilio(accSid, authToken)

export default async function sendSMS (to:string, message:string){
    return client.messages.create({
            body:message,
            from:process.env.TWILIO_PHONE_NUMBER!,
            to:to
        })
}