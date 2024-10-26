# Claims POC
## Front end Portal

This POC is to create a front-end Portal which will be used by user/claims processor to process the claim.
This will be integrated with claim camunda component

### **Prerequisites**
- Since this is developed using react, node must be installed on system.
- Camunda claim flow must be running

### **Run Application**
- go to command for Frontend folder path
- run npm install
- Once dependencies are downloaded
- run npm start

### **Test flow of portal**
- Once application is up, it can acessed via URL http://localhost:3000/
- login into Portal using any Policy id like 22334455, once prompted for OTP eneter 123456 & login
- From Claim Initiation screen, choose a file along with some description. Once submitted reqeust will be sent to Camunda Claims process running.
- Other screen has been designed which can be implented for other features on portal like past claims, payments etc.
