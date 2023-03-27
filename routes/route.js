let alarm = require('../schema/alarmtime');
let status = require('../schema/status');
const express = require('express');
const app = express();
const router = express.Router();
const moment = require('moment-timezone');

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
router.delete('/delStatus', async (req, res) => {
  try {
    // const check = await alarm.findOne({ id: req.params.id });
    // console.log(req.params);
    await status.findOneAndDelete();
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

router.post('/createStatusAll', async (req, res) => {
  const status_tun = 0;
  const status_gun = 0;
  const status_plus = 0;
  const DataAll = new status({
    status_tun: status_tun,
    status_plus: status_plus,
    status_gun: status_gun,
  });
  await DataAll.save()
    .then((res) => console.log('added'))
    .catch((err) => console.log(err));
  console.log(DataAll);
});
router.get('/sort-time', async (req, res) => {
  const Data = await alarm.find();
  // console.log(Data);
  const currentTime = moment().tz('Asia/Bangkok');
  let times = [];
  for (let i = 0; i < Data.length; i++) {
    // console.log(Data[i]);
    times.push(Data[i].time);
  }
  console.log(times);
  console.log(currentTime);
  const timeObjects = times.map((time) => {
    const [hours, minutes] = time.split(':');
    const timeObject = moment().tz('Asia/Bangkok');
    timeObject.hours(hours);
    timeObject.minutes(minutes);
    timeObject.seconds(0);
    timeObject.milliseconds(0);
    return timeObject;
  });
  console.log(timeObjects);
  // Filter out times that have already passed
  const futureTimesToday = timeObjects.filter((time) =>
    time.isAfter(currentTime)
  );

  // If there are no future times, return an error
  let closestTime = '';
  if (futureTimesToday.length === 0) {
    const firstTimeTomorrow = timeObjects[0].add(1, 'day');
    closestTime = firstTimeTomorrow.format('hh:mm A');
  } else {
    // Sort future times in ascending order
    futureTimesToday.sort((a, b) => a - b);

    // Get the first future time and format it as a string
    closestTime = futureTimesToday[0].format('hh:mm A');
  }

  // Send the closest time as response
  res.send(closestTime.split(' ')[0]);
});
router.get('/getStatus', async (req, res) => {
  const checkStatus = await status.findOne();
  res
    .send(checkStatus)
    .then((res) => console.log('added'))
    .catch((err) => console.log(err));
});

router.put('/putStatus', async (req, res) => {
  // #swagger.tags = ['Post']
  // #swagger.description = 'แก้ไข post'

  const oldpost = await status.findOne();
  oldpost.status_tun = req.body.status_tun || oldpost.status_tun;
  oldpost.status_gun = req.body.status_gun || oldpost.status_gun;
  oldpost.status_plus = req.body.status_plus || oldpost.status_plus;
  await oldpost.save();
  res.send(oldpost);
});
module.exports = router;
