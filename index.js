/* eslint-disable no-unused-vars */
const { prefix, token } = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.login(token);

client.on('message', message => {
  const authorid = message.author.id
    if (message.content.startsWith(`${prefix}generate`)) {
      message.channel.send({embed: {
        color: 30935,
        title: "Key Generator",
        fields: [
          { name: "OEM: ", value: '**' + generateOemDate() + '-OEM-' + generateOemSecondSegment() + '-' + generateLastSegment() + '**'},
          { name: "Normal: ", value: '**' + generateSite() + '-' + generateSecondSegment() + '**'}
        ]
      }
    })
    }
});

function generateSite() {
  let rejectedSites = [333, 444, 555, 666, 777, 888, 999];
  let newSite = Math.floor(Math.random() * 1000);
  while (rejectedSites.includes(newSite)) {
    newSite = Math.floor(Math.random() * 1000);
  }
  return String(newSite).padStart(3, '0');
}

function generateSecondSegment() {
  let firstDigits = String(Math.floor(Math.random() * 1000000));
  let lastDigit = Math.floor(Math.random() * 10);
  while (lastDigit == 0 || lastDigit >= 8) {
    lastDigit = Math.floor(Math.random() * 10);
  }
  let secondSegment = firstDigits.concat(String(lastDigit)).padStart(7, '0');
  return secondSegment;
}

function checkSecondSegment() {
  let digitSum = 0;
  do {
    var secondSegment = generateSecondSegment();
    digitSum = 0;
    for (let i = 0; i < secondSegment.length; i++) {
      digitSum += Number(secondSegment.charAt(i));
    }
  } while (digitSum % 7 != 0);
  return secondSegment;
}

function generateOemDate() {
  let day = Math.floor(Math.random() * 367);
  let years = ['95', '96', '97', '98', '99', '00', '01', '02', '03'];
  let year = years[Math.floor(Math.random() * years.length)];
  return String(day).concat(year).padStart(5, '0');
}

function generateOemSecondSegment() {
  let firstDigits = String(Math.floor(Math.random() * 100000));
  let lastDigit = Math.floor(Math.random() * 10);
  while (lastDigit == 0 || lastDigit >= 8) {
    lastDigit = Math.floor(Math.random() * 10);
  }
  let secondSegment = '0';
  secondSegment = secondSegment.concat(firstDigits.concat(String(lastDigit))).padStart(7, '0');
  return secondSegment;
}

function checkOemSecondSegment() {
  let digitSum = 0;
  do {
    var secondSegment = generateOemSecondSegment();
    digitSum = 0;
    for (let i = 0; i < secondSegment.length; i++) {
      digitSum += Number(secondSegment.charAt(i));
    }
  } while (digitSum % 7 != 0);
  return secondSegment;
}

function generateLastSegment() {
  return String(Math.floor(Math.random() * 100000)).padStart(5, '0');
}