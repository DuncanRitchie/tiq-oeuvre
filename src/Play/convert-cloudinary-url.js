const convertCloudinaryUrl = (url, width, format) => {
    let output = url;
    if (width) { output = output.replace(/\/(?=.+\/)(?!.*\/.*\/)/,`/w_${width}/`); }
    if (format) { output = output.replace(/\.\w+(?!.+\.)(?!.+\/)/,"."+format)}
    return output;
}

// let url = "https://res.cloudinary.com/duncanritchie/image/upload/v1578953624/2020_Frankenstein.png";
// console.log(convertCloudinaryUrl(url,null,null)); // https://res.cloudinary.com/duncanritchie/image/upload/v1578953624/2020_Frankenstein.png
// console.log(convertCloudinaryUrl(url,1280,null)); // https://res.cloudinary.com/duncanritchie/image/upload/v1578953624/w_1280/2020_Frankenstein.png
// console.log(convertCloudinaryUrl(url,400,null)); // https://res.cloudinary.com/duncanritchie/image/upload/v1578953624/w_400/2020_Frankenstein.png
// console.log(convertCloudinaryUrl(url,1280,"pdf")); // https://res.cloudinary.com/duncanritchie/image/upload/v1578953624/w_1280/2020_Frankenstein.pdf

export default convertCloudinaryUrl;