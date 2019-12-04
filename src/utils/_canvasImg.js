// 生成文字logo
export default {
    // 建立一个可存取到该file的url
    drawLogo: function(text, font) {
        // 创建画布
        let canvas = document.createElement('canvas');
        // 绘制文字环境
        let context = canvas.getContext('2d');
        // 设置字体
        context.font = font;
        // 获取字体宽度
        let width = context.measureText(text).width;
        // 如果宽度不够 240
        if (width < 240) {
            width = 240;
        } else {
            width = width + 30;
        }
        // 画布宽度
        canvas.width = width;
        // 画布高度
        canvas.height = width;
        // 填充白色
        context.fillStyle = '#ffffff';
        // 绘制文字之前填充白色
        context.fillRect(0, 0, canvas.width, canvas.height);
        // 设置字体
        context.font = font;
        // 设置水平对齐方式
        context.textAlign = 'center';
        // 设置垂直对齐方式
        context.textBaseline = 'middle';
        // 设置字体颜色
        context.fillStyle = '#000000';
        // 绘制文字（参数：要写的字，x坐标，y坐标）
        context.fillText(text, canvas.width / 2, canvas.height / 2);
        // 生成图片信息
        let dataUrl = canvas.toDataURL('image/png');
        return dataUrl;
    },
};
