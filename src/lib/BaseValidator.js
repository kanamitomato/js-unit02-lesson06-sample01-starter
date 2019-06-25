//中身が空でないかどうかを確認するクラスを作成する
//空かどうか確認するには!!を使う
class BaseValidator {
    constructor(type, val){
        this.type = type;//メールアドレスあるいはパスワード
        this.val = val;
    }
    _cannotEmpty(){
        return new Promise((resolve, reject) => {
            if(!!this.val){
                //次のバリデーションにつなげる
                resolve()
            } else {
                //値が空のためエラーメッセージを含むオブジェクトを返す
                reject({
                    success: false,
                    message: `${this.type}は必須です。`
                })
            }
        })
    }
}

//

export default BaseValidator;