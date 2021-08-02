const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelpcamp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20) + 10;
        const camp = new Campground({
            author: "61057c1a5883fdaf88ee0d6f",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: "https://source.unsplash.com/collection/9663343",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga consectetur, nulla pariatur quia neque mollitia dolor autem adipisci cupiditate recusandae accusantium voluptas, ipsum non sapiente natus, alias quos eaque impedit.",
            price,
            images: [
                {
                    "url" : "https://res.cloudinary.com/yuanyun/image/upload/v1627784247/YelpCamp/ioitaezbwclpyazids5o.png", 
                    "filename" : "YelpCamp/ioitaezbwclpyazids5o"
                }, 
                { 
                    "url" : "https://res.cloudinary.com/yuanyun/image/upload/v1627784247/YelpCamp/ext8kece74neevvavvhm.jpg", 
                    "filename" : "YelpCamp/ext8kece74neevvavvhm" 
                } 
            ],
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})