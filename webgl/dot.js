const oCanvas = document.getElementById('oCanvas')
const gl = oCanvas.getContext('webgl')

/**
 * 
 * @param { WebGLRenderingContext } gl 渲染上下文
 * @param { String } sourceCode 源代码字符串
 * @param { Number } type  着色器类型
 */
function createShader(gl, sourceCode, type) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, sourceCode);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        var info = gl.getShaderInfoLog(shader);
        throw "Could not compile WebGL program. \n\n" + info;
    }
    return shader;
}

const vertexStr = document.getElementById("vertex").innerText
// 获取顶点着色器
const vertexShader = createShader(gl, vertexStr, gl.VERTEX_SHADER)

const fragmentStr = document.getElementById("fragment").innerText
// 获取片元着色器
const fragmentShader = createShader(gl, fragmentStr, gl.FRAGMENT_SHADER)


// 创建一个 WebGLProgram 对象由两个编译过后的 WebGLShader 组成 
function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();

    // 添加预先存在的着色器
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        var info = gl.getProgramInfoLog(program);
        throw 'WebGL program 不能编译. \n\n' + info;
    }
    return program;
}

const program = createProgram(gl, vertexShader, fragmentShader)

gl.useProgram(program);

// 获取 attribute 变量
const pot_position = gl.getAttribLocation(program, 'pot_position')
const pot_color = gl.getAttribLocation(program, 'v_color')
// 获取uniform变量
const oCanvas_screen_size = gl.getUniformLocation(program, 'oCanvas_screen_size')

gl.clearColor(1, 0, 1, 1); //清空画布时的预设颜色
gl.clear(gl.COLOR_BUFFER_BIT)


function bindEvent() {
    const points = []
    oCanvas.onmousemove = function (e) {
        const x = e.offsetX
        const y = e.offsetY
        const color = getRandomColor()
        points.push({
            x, y, color
        })

        gl.clearColor(1, 0, 1, 1); //清空画布时的预设颜色
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.uniform2f(oCanvas_screen_size, oCanvas.width, oCanvas.height)
        for (let i = 0; i < points.length; i++) {
            const color = points[i].color
            gl.vertexAttrib2f(pot_position, points[i].x, points[i].y)
            gl.vertexAttrib4f(pot_color, color.r, color.g, color.b, color.a)
            gl.drawArrays(gl.POINTS, 0, 1);
        }
    }
}

function getRandomColor() {
    const r = Math.random();
    const g = Math.random();
    const b = Math.random();
    const a = 0.5 + Math.random() * 0.5;
    return {
        r, g, b, a
    }
}

bindEvent()