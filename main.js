// 主页自定义脚本

document.querySelectorAll('.hero button').forEach(btn => {
    btn.addEventListener('mouseenter', function(e) {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      if (x < rect.width / 2) {
        btn.setAttribute('data-hover-dir', 'left');
      } else {
        btn.setAttribute('data-hover-dir', 'right');
      }
    });
    btn.addEventListener('mouseleave', function() {
      btn.removeAttribute('data-hover-dir');
    });
  });
  
  // WebGL 旋转方块示例
  function startWebGLCube() {
    var canvas = document.getElementById("webgl-cube");
    if (!canvas) return;
    var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
      canvas.parentNode.innerHTML = "WebGL not supported";
      return;
    }
    var vsSource = `
      attribute vec3 aVertexPosition;
      uniform mat4 uMVMatrix;
      uniform mat4 uPMatrix;
      void main(void) {
        gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
      }
    `;
    var fsSource = `
      void main(void) {
        gl_FragColor = vec4(0.1, 0.1, 0.1, 1.0);
      }
    `;
    function loadShader(type, source) {
      var shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    }
    var vertexShader = loadShader(gl.VERTEX_SHADER, vsSource);
    var fragmentShader = loadShader(gl.FRAGMENT_SHADER, fsSource);
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);
    var vertices = [
      -1, -1,  1,  1, -1,  1,  1,  1,  1, -1,  1,  1,
      -1, -1, -1, -1,  1, -1,  1,  1, -1,  1, -1, -1,
      -1,  1, -1, -1,  1,  1,  1,  1,  1,  1,  1, -1,
      -1, -1, -1,  1, -1, -1,  1, -1,  1, -1, -1,  1,
       1, -1, -1,  1,  1, -1,  1,  1,  1,  1, -1,  1,
      -1, -1, -1, -1, -1,  1, -1,  1,  1, -1,  1, -1
    ];
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    var aVertexPosition = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(aVertexPosition);
    var uPMatrix = gl.getUniformLocation(shaderProgram, "uPMatrix");
    var uMVMatrix = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    function getProjection(angle, a, zMin, zMax) {
      var ang = Math.tan((angle * 0.5) * Math.PI / 180);
      return [
        0.5 / ang, 0, 0, 0,
        0, 0.5 * a / ang, 0, 0,
        0, 0, -(zMax + zMin) / (zMax - zMin), -1,
        0, 0, (-2 * zMax * zMin) / (zMax - zMin), 0
      ];
    }
    var mvMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    var pMatrix = getProjection(40, canvas.width / canvas.height, 1, 100);
    var angle = 0;
    function drawScene() {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      angle += 0.5;
      var rad = angle * Math.PI / 180;
      var cosA = Math.cos(rad), sinA = Math.sin(rad);
      mvMatrix = [
        cosA*1.5, 0, sinA*1.5, 0,
        0,    1.5, 0,    0,
        -sinA*1.5,0, cosA*1.5, 0,
        0,    0, -6,   1
      ];
      gl.uniformMatrix4fv(uPMatrix, false, new Float32Array(pMatrix));
      gl.uniformMatrix4fv(uMVMatrix, false, new Float32Array(mvMatrix));
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.vertexAttribPointer(aVertexPosition, 3, gl.FLOAT, false, 0, 0);
      for (var i = 0; i < 6; i++) {
        gl.drawArrays(gl.LINE_LOOP, i * 4, 4);
      }
      requestAnimationFrame(drawScene);
    }
    drawScene();
  }
  startWebGLCube();
  
  document.getElementById('logo-link').addEventListener('click', function(e) {
    e.preventDefault();
    window.location.hash = '#hero';
    window.location.reload();
  });
  
  // tech-list 横向无缝滚动
  document.addEventListener('DOMContentLoaded', function() {
    var techList = document.querySelector('.tech-list');
    var techListInner = document.querySelector('.tech-list-inner');
    if (techListInner) {
      techListInner.innerHTML += techListInner.innerHTML;
      var cards = techListInner.children;
      var half = Math.floor(cards.length / 2);
      var width = 0;
      for (var i = 0; i < half; i++) {
        width += cards[i].offsetWidth + 24;
      }
      techListInner.style.width = (width * 2) + 'px';
      techListInner.style.animation = `tech-scroll 40s linear infinite`;
      var styleSheet = document.createElement('style');
      styleSheet.innerHTML = `
        @keyframes tech-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${width}px); }
        }
      `;
      document.head.appendChild(styleSheet);
      if (techList) {
        techList.addEventListener('mouseenter', function() {
          techListInner.style.animationPlayState = 'paused';
        });
        techList.addEventListener('mouseleave', function() {
          techListInner.style.animationPlayState = 'running';
        });
      }
    }
  });
  
  // overview-desc 字母动画
  function wrapOverviewDesc() {
    var desc = document.querySelector('.overview-desc');
    if (!desc) return;
    var text = desc.textContent;
    desc.innerHTML = '';
    // 判断当前内容是中文还是英文
    let blueWords = [];
    if (/businesses expand|succeed/.test(text)) {
      blueWords = ['businesses expand', 'succeed'];
    } else if (/扩展|成功/.test(text)) {
      blueWords = ['扩展', '成功'];
    }
    let i = 0;
    while (i < text.length) {
      let matched = false;
      for (const word of blueWords) {
        if (text.slice(i, i + word.length) === word) {
          for (let j = 0; j < word.length; j++) {
            const ch = word[j] === ' ' ? '&nbsp;' : word[j];
            desc.innerHTML += `<span class=\"blue\">${ch}</span>`;
          }
          i += word.length;
          matched = true;
          break;
        }
      }
      if (!matched) {
        const ch = text[i] === ' ' ? '&nbsp;' : text[i];
        desc.innerHTML += `<span>${ch}</span>`;
        i++;
      }
    }
  }
  wrapOverviewDesc();

  function animateOverviewDesc() {
    var desc = document.querySelector('.overview-desc');
    if (!desc) return;
    var spans = desc.querySelectorAll('span');
    var rect = desc.getBoundingClientRect();
    var winH = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < winH - 80 && rect.bottom > 80) {
      // 进入视口，逐字变黑
      spans.forEach((span, i) => {
        setTimeout(() => {
          span.classList.add('active');
        }, i * 18);
      });
    } else {
      // 离开视口，全部变灰
      spans.forEach(span => span.classList.remove('active'));
    }
  }
  window.addEventListener('scroll', animateOverviewDesc);
  // 首次加载也检测一次
  animateOverviewDesc();
  
  // EmailJS自动发邮件逻辑
  document.addEventListener('DOMContentLoaded', function() {
    if(typeof emailjs === 'undefined') {
      alert('邮件服务加载失败，请刷新页面重试！');
      return;
    }
    emailjs.init('CiaFVeAUf5IwzPx29');
    var form = document.getElementById('contactForm');
    if(form){
      form.addEventListener('submit', function(e){
        e.preventDefault();
        var name = form.name.value.trim();
        var email = form.email.value.trim();
        var company = form.company.value.trim();
        var message = form.message.value.trim();
        if(!name || !email || !company || !message){
          alert('请填写所有信息后再提交！');
          return;
        }
        var params = {
          name: name,
          email: email,
          company: company,
          message: `AMW有客户咨询："姓名：${name}   邮箱：${email}   公司名称：${company}   项目简介：${message} "`
        };
        emailjs.send('service_heevdno', 'template_m9zjmrl', params)
          .then(function(){
            alert('发送成功！我们会尽快联系您。');
            form.reset();
          }, function(err){
            alert('发送失败，请稍后再试。');
          });
      });
    }
  });
  
  