

let actions = {
    
    // 初始化分类数据
    initializationDataSaga: ()=>({
        type: "initializationDataSaga",
    }),
    // 记账
    saveAccountSaga: (data)=>({
        type: "saveAccountSaga",
        data: data,
    }),

}


export default actions;

