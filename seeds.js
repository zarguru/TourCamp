var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Costa Rica",
        image: "https://i.pinimg.com/originals/68/73/ca/6873ca584da86c9f85e19a09026fdb84.jpg",
        description: "Bioluminescent beach costa rica - Travel Share and enjoy!",
        author:{
            id : "588c2e092403d111454fff76",
            username: "Jack"
        }
    },
    {
        name: "Mout Lu",
        image: "https://i.pinimg.com/originals/11/9d/bb/119dbbb1eea4960c9f80afce806a9eb7.jpg",
        description: "Mount Lu or Lushan (simplified Chinese: 庐山; traditional Chinese: 廬山; pinyin: Lúshān, Gan: Lu-san), also known as Kuanglu (匡庐) in ancient times, is situated in the northern part of Jiangxi province in Central China, and is one of the most renowned mountains in the country. It is located primarily in Lushan county-level city in Jiujiang Prefecture, although the northern portions are found in Lianxi District which was formerly known as Lushan District and until 2016 covered the majority of the Mount Lu. The oval-shaped mountains are about 25 km long and 10 km wide, and neighbors Jiujiang city and the Yangtze River to the north, Nanchang city to the south, and Poyang Lake to the east. Its highest point is Dahanyang Peak (大汉阳峰), reaching 1,474 m above sea level, and is one of the hundreds of steep peaks that towers above a sea of clouds that encompass the mountains for almost 200 days out of the year. Mount Lu is known for its grandeur, steepness, and beauty, and is part of Lushan National Park, a UNESCO World Heritage Site since 1996, and a prominent tourist attraction, especially during the summer months when the weather is cooler.Lushan was a summer resort for Western missionaries in China. Absalom Sydenstricker, the father of Pearl Buck, was one of the first five missionaries to acquire property in the Kuling Estate on the mountain. The development of Kuling was instigated by the Reverend Edward Little and Dr. Edgerton H. Hart. [1] The four principal founders of the China's Nurses Association and its first president, Caroline Maddock Hart; met in Kuling to form this association.[2]",
        author:{
            id : "588c2e092403d111454fff77",
            username: "Jane"
        }
    },
    {
        name: "Hạ Long Bay",
        image: "https://media.worldnomads.com/explore/vietnam/halong-bay-vietnam-from-above-gettyimages.jpg", 
        description: "Multiple tree-covered limestone islands dot this scenic diving, rock climbing & hiking destination.",
        author:{
            id : "588c2e092403d111454fff71",
            username: "Jill"
        }
    },
    {
        name: "Panna Meena Ka Kund",
        image: "https://live.staticflickr.com/1655/24700196000_d6451d3e7c_b.jpg", 
        description: "Panna Meena Ka Kund adalah Step Well-nya Jaipur.",
        author:{
            id : "588c2e092403d111454fff71",
            username: "Jim"
        }
    },
    {
        name: "Burgundy Vineyards",
        image: "https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/34/2020/03/burgundy-vineyards-alamy-K6W14A-620x410.jpg", 
        description: "Private Luxury Wine tour: The A, B ,C: Alsace, Burgundy and Champagne wine tours - 8 days and 7 nights in luxury hotels.",
        author:{
            id : "588c2e092403d111454fff71",
            username: "Jill"
        }
    }
]; 

function seedDB(){
    //Remove all campgrounds
    Campground.deleteMany({}, function(err){  // remove() will cause deprecation, deleteOne() only deletes 1 post!
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        //add a few campgrounds
        data.forEach(function(seed){
           Campground.create(seed, function(err, campground){
               if(err){
                   console.log(err);
               } else {
                   console.log("added a campground");
                   //create a comment
                   Comment.create(
                      {
                          text: "This place is great, but I wish there was internet",
                          author:{
                             id : "588c2e092403d111454fff71",
                             username: "Jill"
                          }
                      }, function(err, comment){
                           if(err){
                               console.log(err);
                           } else { 
                               campground.comments.push(comment);
                               campground.save();
                               console.log("Created new comment");
                           }                                                                                                                                                                                
                    });
               }
           }); 
        });
    });
    
    
    //add a few comments
}

module.exports = seedDB;