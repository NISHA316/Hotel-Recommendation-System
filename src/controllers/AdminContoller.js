// // src/controllers/adminController.js
// const path = require('path');

// let aboutData = {
//     title: 'Starting From the Travelers',
//     text: 'Berawal dari kami para traveler bernama lala...',
//     image: 'AdminImg.jpeg'
// };

// exports.dashboard = (req, res) => {
//     res.render('dashboard', {
//         roomCount: 14,
//         facilityCount: 7,
//         galleryCount: 12,
//         about: aboutData
//     });
// };

// exports.updateAbout = (req, res) => {
//     const { title, text } = req.body;

//     if (req.file) {
//         aboutData.image = req.file.filename;
//     }

//     aboutData.title = title;
//     aboutData.text = text;

//     res.redirect('/');
// };
