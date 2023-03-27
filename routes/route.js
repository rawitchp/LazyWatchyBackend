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
  const currentTime = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Bangkok',
  });
  let times = [];
  for (let i = 0; i < Data.length; i++) {
    // console.log(Data[i]);
    times.push(Data[i].time);
  }
  console.log(times);
  console.log(currentTime);
  const timeObjects = times.map((time) => {
    const [hours, minutes] = time.split(':');
    const timeObject = new Date();
    timeObject.setUTCHours(hours);
    timeObject.setUTCMinutes(minutes);
    timeObject.setUTCSeconds(0);
    timeObject.setUTCMilliseconds(0);
    return timeObject;
  });
  console.log(timeObjects);
  // Filter out times that have already passed
  const futureTimes = timeObjects.filter((time) => time > currentTime);

  // If there are no future times, return an error
  if (futureTimes.length === 0) {
    if (futureTimes.length === 0) {
      // Get the current date in Thailand time zone
      const currentDate = new Date(currentTime).toLocaleDateString('en-US', {
        timeZone: 'Asia/Bangkok',
      });

      // Add one day to the current date
      const nextDay = new Date(currentDate);
      nextDay.setDate(nextDay.getDate() + 1);

      // Convert the times for the next day to Date objects in Thailand time zone
      const nextDayTimeObjects = times.map((time) => {
        const [hours, minutes] = time.split(':');
        const timeObject = new Date(nextDay);
        timeObject.setHours(hours);
        timeObject.setMinutes(minutes);
        timeObject.setSeconds(0);
        timeObject.setMilliseconds(0);
        return timeObject;
      });

      // Sort the times for the next day in ascending order
      nextDayTimeObjects.sort((a, b) => a - b);

      // Get the first time for the next day and convert it back to a string in the Thailand time zone
      let closestTime = nextDayTimeObjects[0]
        .toLocaleTimeString('en-US', {
          timeZone: 'Asia/Bangkok',
          timeStyle: 'short',
        })
        .split(' ')[0];
      if (closestTime.length == 4) {
        closestTime = '0' + closestTime;
      }
      // Send the closest time for the next day as response
      res.send(closestTime);
      return;
    }
  }

  // Sort future times in ascending order
  futureTimes.sort((a, b) => a - b);

  // Get the first future time and convert it back to string
  let closestTime = futureTimes[0]
    .toLocaleTimeString('en-US', {
      timeZone: 'Asia/Bangkok',
      timeStyle: 'short',
    })
    .split(' ')[0];
  if (closestTime.length == 4) {
    closestTime = closestTime.concat('0');
  }

  // Send the closest time as response
  res.send(closestTime);
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
