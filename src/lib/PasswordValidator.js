import BaseValidator from './BaseValidator';

export default class extends BaseValidator {
    constructor(val) {
        super(val, 'パスワード');
        this._checkLength = this._checkLength.bind(this);
    }
    validate() {
        return super._cannotEmpty()
        .then(this._checkLength)
        .then((res) => {
            return {success: true};
        })
        .catch(err => {
            return err;
        });
    }
    _checkLength(){
        if (this.val.length >= 8){
            return Promise.resolve();
        } else {
            return Promise.reject({
                success: false,
                message: `パスワードが短すぎます。`
            });
        }
    }
}