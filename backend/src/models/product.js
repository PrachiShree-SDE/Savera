const mongoose = require('mongoose');
const User = require('./users');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 20
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    description: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 200,
    },
    imageUrl: {
        type: String,
        required: true,
        trim: true,
    },
    brand: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 40
    },
    category: {
        type: String,
        enum: {
            values: [
                "electronics",
                "fashion",
                "home",
                "books",
                "sports",
                "beauty"
            ],
            message: "{VALUE} is not a valid category"
        },
        required: true,

    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, {
    timestamps: true,
}
)

productSchema.index({
    category: 1,
    price: 1
});

productSchema.pre("save", async function () {
    if (this.isModified('title') && this.title) {
        this.title = this.title.trim().toLowerCase();
    }
});

module.exports = mongoose.model("Product", productSchema);