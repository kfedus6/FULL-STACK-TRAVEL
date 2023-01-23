const nodemailer=require("nodemailer");



let transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: "teste742a@gmail.com",
        pass: "cenpldqhgqofhqsr"
    }
})

const sendEmail=(where,text)=>{
    const mailOption={
        from:"email service",
        to:where,
        subject:"test2",
        html:text
    }
    transporter.sendMail(mailOption,(err,info)=>{
        if(err){
            console.log(1);
        }else {
            mailOption.to=where;
            mailOption.html=text;
        }
    })   
}

module.exports=sendEmail;