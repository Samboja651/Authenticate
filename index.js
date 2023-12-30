const express = require('express');
var request = require('request');

const app = express();

app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.urlencoded())

app.get('/', (req, res) => {
    res.render('signup')
})
app.post('/new_user', (req, res) => {
    const {email, password, name} = req.body;
    // res.json(`{email:${email}, password:${password}, name:${name}}`)

    // var options = {
    //     'method': `POST`,
    //     'url': `http://127.0.0.1:5000/hash/api/encrypt/5/${password}`,
    //     'headers': {
    //     }
    //   };
    //   request(options, function (error, response) {
    //     if (error) throw new Error(error);
    //   //   res.send(response.body);
    //     let encrypted_password = (JSON.parse(response.body))
    //     res.send(encrypted_password)
    //   });  
    const numerics = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    const capital_letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    const small_letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    const special_char = ['!', '@', '#', '$', '%', '&', '(', ')', "'", '"', '*', '-', '+', '/', '`', '.']
    
    function validate(seq, password){
        for (char in seq){
      
          if(password.includes(seq[char])){
            return true
          }
          else{
            continue
          }
      
        }
    }

    if(email == '' || name == '' || password == ''){
        res.render('error_signup', {message: 'error,field cannot be empty', email: email, name: name, password: password})
    }
    else if(email.search('@') == -1 || email.includes('.') == false){
        res.render('error_signup', {message: 'Invalid email, must include @ and dot', email: email, name: name, password: password})
    }
    else if(email.length > 50 || email.length < 7){
        res.render('error_signup', {message: 'Invalid email size' ,email: email, name: name, password: password})
    }
    else if(name.length > 24 || name.length < 2){
        res.render('error_signup', {message: 'Invalid name size',email: email, name: name, password: password}) 
    }
    else if(password.length < 8 || password.length > 24){
        res.render('error_signup', {message: 'Invalid password length', email: email, name: name, password: password})
    }
    
    // check password has digit
    else if(validate(numerics, password) !== true){
        res.render('error_signup', {message: 'password must have atleast one digit', email: email, name: name, password: password})
    }
    // check password has capital letter
    else if(validate(capital_letters, password) !== true){
        res.render('error_signup', {message: 'password must have atleast one captil letter', email: email, name: name, password: password})
    }

    // check password has small letter
    else if(validate(small_letters, password) !== true){
        res.render('error_signup', {message: 'password must have atleast one small letter', email: email, name: name, password: password})
    }

    // check password has special char
    else if(validate(special_char, password) !== true){
        res.render('error_signup', {message: 'password must have atleast one special character', email: email, name: name, password: password})
    }

    else{
        res.send('success')
    }
})

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`server active on http://localhost:${PORT}`);
});


