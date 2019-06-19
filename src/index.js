import { timingSafeEqual } from "crypto";
import MailValidator from './lib/MailValidator';
import PasswordValidator from './lib/PasswordValidator';

{
    const submit = document.getElementById('submit');//送信ボタンの要素を取得
    submit.addEventListener('click', onSubmit);//送信ボタンがクリックされるとonsubmitを呼び出す
}

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
    let val = input.val;
    input.classList.add('is-invalid');
    input.insertAdjacentHTML('afterend', `<div class="invalid-feedback">${message}</div>`);//input要素の後にエラーメッセージを表示する。
}

const onSubmit = async () => {
    let emailInput = document.getElementById('email');
    let passwordInput = document.getElementById('password');//input要素を取得
    let emailVal = emailInput.value;//input要素に入力された値を得るために要素のvalueプロパティにアクセスする
    let passwordVal = passwordInput.value;
    const results = await validate(emailVal, passwordVal);
    if(results[0].success && results[1].success) {
        //バリデーション成功、ログインファンクションを呼び出す
    } else if(results[0].success){
        //パスワードのバリデーションに失敗
        addErrorMessage("password", results[1].message)
    } else if(results[1].success) {
        //メールアドレスのバリデーションに失敗
        addErrorMessage("email", res[0].message);
    } else { 
        //メールアドレス、パスワードともにバリデーション失敗
        addErrorMessage("email", res[0].message);
        addErrorMessage("password", res[1].message);
    }
}