const { Configuration, OpenaiApi } = require('openai');

const Configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenaiApi(Configuration);


const generatImage = async (req, res) => {
 
    const { prompt, size } = req.body;

    const imageSize = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

    try {
        const response = await openai.generatImage({
            prompt,
            n: 1,
            size: imageSize
        });
        const imageUrl = response.data.data[0].url

        res.status(200).json({
            success: true,
            data: imageUrl
        })

    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        }

        res.status(400).json({
            success: false,
            error: 'The image could not be generated'
        })
    }
}


module.exports = { generatImage };