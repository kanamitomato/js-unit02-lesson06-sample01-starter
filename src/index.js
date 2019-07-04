import MailValidator from './lib/MailValidator';
import PasswordValidator from './lib/PasswordValidator';
import 'whatwg-fetch';
const endpoint = 'http://localhost:3000';

const validate = (email, password) => {
    const mailValidator = new MailValidator(email);
    const passwordValidator = new PasswordValidator(password);
    return Promise.all([
        mailValidator.validate(),
        passwordValidator.validate()
    ]);
}

const addErrorMessage = (type, message) => {
    let input = document.getElementById(type);//メールアドレスなら"email"、パスワードなら"password"がタイプに入る
    input.classList.add('is-invalid');
    input.insertAdjacentHTML('afterend', `<div class="invalid-feedback">${message}</div>`);//input要素の後にエラーメッセージを表示する。
}


const removeErrors = () => {
    return new Promise((resolve) => {
        document.querySelectorAll('.is-invalid').forEach((el) => {
            el.classList.remove('.is-invalid');
        })
        document.querySelectorAll('.invalid-feedback').forEach((el) => {
            el.parentNode.removeChild(el);
        })
        resolve();
    })
}

const login = (email, password) => {
    return fetch(`${endpoint}/login`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then((res) => {
        const json = res.json();
        if(res.status === 200) {
            return json
        } else {
            return Promise.reject(new Error('ログイン失敗'))
        }
    })
}

const onSubmit = async () => {
    await removeErrors()
    let emailInput = document.getElementById('email');
    let passwordInput = document.getElementById('password');//input要素を取得
    let emailVal = emailInput.value;//input要素に入力された値を得るために要素のvalueプロパティにアクセスする
    let passwordVal = passwordInput.value;
    const results = await validate(emailVal, passwordVal);
    if(results[0].success && results[1].success) {
        login(emailVal, passwordVal)
        .then((json) => {
            alert(json.message);
        })
        .catch((err) => {
            alert(err.message);
        })
        //バリデーション成功
    } else if(results[0].success){
        //パスワードのバリデーションに失敗
        addErrorMessage("password", results[1].message)
    } else if(results[1].success) {
        //メールアドレスのバリデーションに失敗
        addErrorMessage("email", results[0].message);
    } else { 
        //メールアドレス、パスワードともにバリデーション失敗
        addErrorMessage("password", results[1].message);
        addErrorMessage("email", results[0].message);
    }
}

{
    const submit = document.getElementById('submit');//送信ボタンの要素を取得
    submit.addEventListener('click', onSubmit);//送信ボタンがクリックされるとonsubmitを呼び出す
}