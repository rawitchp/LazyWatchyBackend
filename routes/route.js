let alarm = require('../schema/alarmtime');
let status = require('../schema/status');
const express = require('express');
const app = express();
const router = express.Router();
router.post('/saveAlarm', async (req, res) => {
  const time = req.body.time;
  const Data = new alarm({ time: time });
  await Data.save()
    .then((res) => console.log('added'))
    .catch((err) => console.log(err));
  console.log(Data);
});

router.delete('/del/:id', async (req, res) => {
  try {
    // const check = await alarm.findOne({ id: req.params.id });
    // console.log(req.params);
    await alarm.findOneAndRemove({ _id: req.params.id });
    res.send('delete');
  } catch (e) {
    response.status(500).send({ message: e.message });
  }
});
router.get('/time', async (req, res) => {
  alarm
    .find()
    .then((a) => res.json(a))
    .catch((err) => console.log(err));
});
router.post('/saveStatusplus', async (req, res) => {
  const status_plus = req.body.status_plus;
  const Dataplus = new status({ status_plus: status_plus });
  await Dataplus.save()
    .then((res) => console.log('added'))
    .catch((err) => console.log(err));
  console.log(Dataplus);
});
router.delete('/delstatus', async (req, res) => {
  try {
    // const check = await alarm.findOne({ id: req.params.id });
    // console.log(req.params);
    await status.findOneAndRemove({ _id: req.params.id });
    res.send('delete');
  } catch (e) {
    response.status(500).send({ message: e.message });
  }
});

router.post('/saveStatusgun', async (req, res) => {
  const status_gun = req.body.status_gun;
  const Datagun = new status({ status_gun: status_gun });
  await Datagun.save()
    .then((res) => console.log('addee'))
    .catch((err) => console.log(err));
  console.log(Datagun);
});

router.post('/saveStatustun', async (req, res) => {
  const status_tun = req.body.status_tun;
  const Datatun = new status({ status_tun: status_tun });
  await Datatun.save()
    .then((res) => console.log('added'))
    .catch((err) => console.log(err));
  console.log(Datatun);
});

router.post('/createstatusAll', async (req, res) => {
  const status_tun = ""
  const status_gun = ""
  const status_plus = "";
  const DataAll =new status({status_tun: status_tun,status_plus: status_plus,status_gun: status_gun});
  await DataAll.save()
  .then((res) => console.log('added'))
  .catch((err) => console.log(err));
console.log(DataAll);
});
router.get('/sort-time', (req, res) => {
  const { timeString } = req.params;
  const timeArray = timeString.split(',');
  const sortedTimeArray = timeArray.sort((a, b) => {
    const aTime = new Date(`${a}:00`);
    const bTime = new Date(`2023-03-23T${b}:00`);
    const currentTime = new Date();
    const aDiff = Math.abs(aTime - currentTime);
    const bDiff = Math.abs(bTime - currentTime);
    return aDiff - bDiff;
  });
  res.send(sortedTimeArray[0]);

});
router.get('/getStatus', async (req, res) => {
  const checkStatus = await status.findOne();
  res.send(checkStatus)
  .then((res) => console.log('added'))
  .catch((err) => console.log(err));

});

router.put("/putstatus", async (req, res) => {
  // #swagger.tags = ['Post']
  // #swagger.description = 'แก้ไข post'
  


    const oldpost = await status.findone();
    const newpost = new status({
        status_tun : oldpost.status_tun,
        status_gun : oldpost.status_gun,
        status_plus : oldpost.status_plus
          
      });
      await newpost.save();
      await status.findoneAndUpdate();
      response.send("finish");
  });
module.exports = router;
//test