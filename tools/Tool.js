/**
 * @author QianXueSama
 */
class Tool {

    // #region 颜色值转换

    // const glslColor = 'vec3(0.5, 0.2, 0.8)';
    // const hexColor = glToHex(glslColor);
    // console.log(hexColor); // 输出: #7f33cc
    static glToHex(glslStr) {
        glslStr = glslStr.replace('vec3(', '');
        glslStr = glslStr.replace(')', '');
        let arr = glslStr.split(',').map(Number);
        for (let val of arr) {
            if (val > 1 || val < 0) {
                return '';
            }
        }
        let col = new Color().fromArray(arr);
        return `#${col.getHexString()}`;
    }

    // const hexColor = '#7f33cc';
    // const glslColor = hexToGL(hexColor);
    // console.log(glslColor); // 输出: vec3(0.498, 0.2, 0.8)
    static hexToGL(hexStr) {
        console.log('hexToGL');
        //check if valid hex value
        if (/^#([0-9A-F]{3}){1,2}$/i.test(hexStr)) {
            let col = new Color(hexStr);
            let out = col.toArray().map((x) => {
                //to fixed 3
                let conv = Math.round(x * 1000) / 1000;
                //append missing periods
                if (conv.toString().indexOf('.') === -1) conv += '.';
                return conv;
            });
            return `vec3(${out})`;
        } else {
            return '';
        }
    }

    // const rgbValues = [255, 128, 64];
    // const normalizedValues = rgbToNormalized(rgbValues);
    // console.log(normalizedValues); // 输出: [1, 0.5019607843137255, 0.25098039215686274]
    static rgbToNormalized(rgb) {
        if (Array.isArray(rgb) && rgb.length === 3) {
            // 确保输入是一个包含三个元素的数组
            const normalized = rgb.map(value => value / 255);
            return normalized;
        } else {
            // 输入不合法时返回空数组或其他错误处理方法
            return [];
        }
    }


    // #endregion

    // #region

    // #endregion

    /**
     * 将Canvas坐标转换为WebGL着色器坐标
     * @param {MouseEvent} e - 鼠标事件对象，包含客户端的坐标信息
     * @param {HTMLCanvasElement} canvas - 目标Canvas元素，用于获取其位置信息
     * @returns {Array} - 包含转换后的着色器坐标 [x, y]
     */
    static convertCanvasToShader(e, canvas) {
        let x = e.clientX;
        let y = e.clientY;
        let rect = canvas.getBoundingClientRect(); // canvas对象的位置信息
        x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
        y = -((y - rect.top) - canvas.height / 2) / (canvas.height / 2);

        return [x, y];
    }
}