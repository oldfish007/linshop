/**
 * @Description: 矩阵的操作都同意定义在这里类下面
 * @author Howard zheng
 * @date
*/
class Matrix{
    m
    constructor(matrix) {
        this.m = matrix
    }
    //比如3*4的矩阵 3就是行
    get rowsNum(){
        return this.m.length
    }
    get colsNum(){
        return this.m[0].length
    }
    //3*4
    //经典生成器写法  cb是一个回调函数
    /**第一列 第0行 第一列 第一行 第一列 第二行
     * 第二列 第0行 第二列 第一行 第二列 第二行
     * 第三列 第0行 第三列 第一行 第三列 第二行
     * @param cb
     */
    each(cb){
        for(let j=0;j<this.colsNum;j++){
            for(let i=0;i<this.rowsNum;i++){
                const element = this.m[i][j]
                cb(element,i,j)
            }
        }
    }
//Numpy python里面的一个数学库
    transpose(){
        const desArr = []
        for(let j=0;j<this.colsNum;j++){
            //定义一个二维数组  [[],[],[]]
             desArr[j]=[]
            for(let i=0;i<this.rowsNum;i++){
                desArr[j][i]=this.m[i][j]
            }
        }
        return desArr
    }
}
export {
    Matrix
}