// Vertex shader program
var VSHADER_SOURCE =
  "attribute vec4 a_Position;" +
  "attribute float a_PointRadius;" +
  "void main(){" +
  "   gl_Position = a_Position;" + // 设置坐标
  "   gl_PointSize = a_PointRadius;" + // 设置尺寸
  "}";

// Fragment shader program
var FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + // Set the point color
  '}\n';

function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  setBackgroundColor(gl);

  // 在着色器程序（program）中获取指定名称的顶点着色器变量地址，估计是数组地址
  let a_Position = gl.getAttribLocation(gl.program, 'a_Position'); // a_Position的值为0
  let a_PointRadius = gl.getAttribLocation(gl.program, 'a_PointRadius'); // a_Position的值为1
  if (a_Position < 0 || a_PointRadius < 0) {
    console.log("获取失败");
    return;
  }
   
  // 指定半径
  gl.vertexAttrib1f(a_PointRadius, 20);

  let g_points = []; // 存储点击的点坐标
  // 注册鼠标响应事件
  canvas.onmousedown = function(e){
      let point = convertCanvasToShader(e, canvas);
      g_points.push({x: point[0], y: point[1]});

      setBackgroundColor(gl);

      // 绘制点
      for(let i = 0; i < g_points.length; i++){
          gl.vertexAttrib3f(a_Position, g_points[i].x, g_points[i].y, 0.0);
          gl.drawArrays(gl.POINTS, 0, 1);
      }
  };
}

// 设置背景颜色
function setBackgroundColor(gl, color = [0.0, 0.0, 0.0, 1.0]) {
  gl.clearColor(color[0], color[1], color[2], color[3]);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

// canvas坐标转webGL着色器坐标
function convertCanvasToShader(e, canvas) {
  let x = e.clientX;
  let y = e.clientY;
  let rect = canvas.getBoundingClientRect(); // canvas对象的位置信息
  x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
  y = -((y - rect.top) - canvas.height / 2) / (canvas.height / 2);

  return [x, y];
}