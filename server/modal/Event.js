const { default: mongoose } = require('mongoose');

const EventSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
        
    },
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    roomName: {
        type: String,
        required: [true, "Please Select Your Room"]
    },
    StartTime: {
        type: Date,
        required: [true, "Start time is missing"],
        validate: {
            validator: async function (value) {
                const events = await this.constructor.find({
                    _id: { $ne: this._id },
                    roomName: this.roomName,
                    $or: [
                        { StartTime: { $lte: value }, EndTime: { $gt: value } },
                        { StartTime: { $lt: this.EndTime }, EndTime: { $gte: this.EndTime } }
                    ]
                });
                return events.length === 0;
            },
            message: props => `The time slot ${props.value} is already booked`
        }
    },
    EndTime: {
        type: Date,
        required: [true, "End time is missing"],
        validate: {
            validator: async function (value) {
                const events = await this.constructor.find({
                    _id: { $ne: this._id },
                    roomName: this.roomName,
                    $or: [
                        { StartTime: { $lt: this.StartTime }, EndTime: { $gte: this.StartTime } },
                        { StartTime: { $lt: value }, EndTime: { $gte: value } }
                    ]
                });
                return events.length === 0;
            },
            message: props => `The time slot ${props.value} is already booked`
        }
    },
    availability: {
        type: Boolean,
        required: true
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        
    }
}, { timestamps: true });

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;






// const { default: mongoose } = require('mongoose');

// const EventSchema = new mongoose.Schema({

//     username: {
//         type: String,
//         required: [true, "Please Enter Your name"]
//     },
//     title: {
//         type: String,
//         required: [true, "Title is required"]
//     },
//     roomName: {
//         type: String,
//         required: [true, "Please Select Your Room"]
//     },
//     StartTime: {
//         type: String,
//         required: [true, "Start time is missing"],
//     },

//     EndTime: {
//         type: String,
//         required: [true, "End time is missing"],

//     },

//     availability: {
//         type: Boolean,
//         required: true
//     },
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//       }

// },

//     {
//         timestamp: true
//     });

// const event = new mongoose.model("Event", EventSchema);

// module.exports = event;



