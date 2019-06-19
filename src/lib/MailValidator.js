import BaseValidator from './BaseValidator';

class MailValidator extends BaseValidator {
    constructor(val) {
        super(val, "メールアドレス");//superクラスのコンストラクタを呼び出す
        this._checkFormat = this._checkFormat.bind(this);
    }
    validate() {
        return super.cannotEmpty()
        .then(this._checkFormat)
        .then((res) => {
            return { success: true };
        })
        .catch(err => {
            return err;
        });
    }
    _checkFormat(){
        const re = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i; //メールアドレスの正規表現
        const match = re.test(this.val);
        if(match) {
            return Promise.resolve();
        } else {
            return Promise.reject({
                success: false,
                message: `${this.type}のフォーマットが異なります。`
            });
        }
    }
}