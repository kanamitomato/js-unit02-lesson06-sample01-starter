//中身が空でないかどうかを確認するクラスを作成する
//空かどうか確認するには!!を使う
export default class {
    constructor(type, val){
        this.type = type;
        this.val = val;
        this.result = {};
    }
    _cannotEmpty(){
        return new Promise((resolve, reject) => {
            if(!!this.val){
                resolve(this)
            } else {
                reject({
                    success: false,
                    message: `${this.type}は必須です。`
                })
            }
        })
    }
}