const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');

var csv = require("fast-csv");
let xs = [];
var ys = [];
var file_name = "./THB.csv"
var trainXS;
var trainYS;
var dataCsv;
/*
function range(start, end) {
    var ans = [];
    for (let i = start; i < end; i++) {
        ans.push(i);
    }
    return ans;
}
*/
async function readCSV() {
    var markdata = [];
    var data = new Promise(function(resolve, reject) {
        csv.fromPath(file_name).on("data", (str) => {    
          if(str.length != 0) {
            markdata.push(str)
          }
        }).on("end", () => {
          resolve(markdata)
        });
    });


    return data
}

dataCsv = readCSV().then((value) => (
  xs = value
))
console.log(dataCsv)

// async function prepareData() {
//     /*
//     MAX = -999;
//     const len = data.length
//     for (i=0; i<len; i++) {
//         if (MAX <= data[i]) {
//             MAX = data[i];
//         }
//     }
    
//     let dataset = data.map((number) => {
//         return number/MAX;
//     })

//     let arr = range(TIME_STEP, dataset.length - NUM_OUT + 1);

//     arr.forEach(function(i) {
        
//     });
//     */




//    // [10,20,30,40,50,60]
//   //  //ข้อมูลที่ใช้สอนคอมพิวเตอร์
//   //          //3 transtep , 1 มิติ
//   //  xs = [[10,20,30],[20,30,40],[30,40,50]];
//   //  //ผลเฉลยที่ควรจะเป็น
//   //  ys = [40,50,60];


//   readCSV();
// }


// const model = tf.sequential();

// model.add(tf.layers.lstm({
//     //units คือ จำนวน nodeในการ train ใน slide ฝั่งขวา repesentation 3
//     units: 300,
//     //มิติของข้อมูลในการวนรอบตัวเองกี่ครั้ง [10,20,30] => 3,1 | [20,30,40],[30,40,50] => 3,2
//     inputShape: [2, 1514],
//     returnSequences: false
// }));

// // //ชั้นสุดท้าย
// model.add(tf.layers.dense({
//     // units คือ จำนวน nodeในการ train ซึ่งกำหนดให้ชั้นสุดท้ายมีแค่ชั้นเดียว
//     units: 1,
//     kernelInitializer: 'VarianceScaling',
//     // activate function กรองข้อมูล
//     activation: 'relu'
// }));

// //ปรับค่าในแต่ละรอบเพื่อ
// const LEARNING_RATE = 0.001;
// // diff เพื่อหาความชัน
// const optimizer = tf.train.adam(LEARNING_RATE);

// model.compile({
//     optimizer: optimizer,
//     //หาค่า mean ที่ใส่เข้าไป
//     loss: 'meanSquaredError',
//     metrics: ['accuracy'],
// });

// async function main(){
//     async function trainModel()
//     {
//         const history = await model.fit(
//             trainXS,
//             trainYS,
//             {
//                 batchSize: 1,
//                 //ให้มันแม่นขึ้น
//                 epochs: 1000,
//                 //ดึงมา train แบบสลับ = true
//                 shuffle: true,
//                 //20 ดึงมา train 80  0.2
//                 validationSplit: 0.2
//             });
//     }
//     await prepareData();
//     trainXS = tf.tensor2d(xs);
//     //มิติแรกคือจำนวนข้อมูล มิติที่สองคือข้อมูลในแต่ละ timestep มิติที่สามคือ ฟีเจอร์ที่ใส่ใน time step[]
//     trainXS = tf.reshape(trainXS,[-1, 3, 1]);

//     //มิติแรกคือจำนวนผลเฉลย มิติที่สองคือจำนวนฟีเจอร์
//     trainYS = tf.tensor(ys);
//     trainYS = tf.reshape(trainYS,[-1, 1])
    
// 	await trainModel();
//     const saveResult = await model.save('file://model');
    
//     const load = async () => {
//         const model = await tf.loadModel('file://model/model.json');
//       };
      
//     load();
//     let testSet = [['Nov 25, 2013','32.03'],['Oct 31']];
//     let a = tf.tensor2d(testSet);
//     let b = tf.reshape(a, [1,3,1]);


//     const r = model.predict(b);
//     let result = r.dataSync()[0];
//     console.log(`result => ${result}`);
// }

// main();