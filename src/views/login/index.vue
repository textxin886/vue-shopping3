<!-- 登录 -->
<script setup>
//表单效验（账号密码）
import { ref } from 'vue'
import {loginAPI} from '@/apis/user'
import 'element-plus/theme-chalk/el-message.css'//提示组件
import { useRouter } from 'vue-router'//获取路由参数
import { ElMessage } from 'element-plus'
const form = ref(
    {
        account: '',
        password: '',
        agree:true
    }
)
// 2.准备规则对象
const rules={
    account:[
        //required是否必填，message提示信息，trigger触发方式，是blur是失去焦点，change是值改变
        {required:true,message:'请输入账号',trigger:'blur'}
    ],
    password:[
        {required:true,message:'请输入密码',trigger:'blur'},
        {min:6,max:14,message:'密码长度在6-14位之间',trigger:'blur'}
    ],
    agree:[
       {
         validator: (rule, value, callback) => {
            
            if (value) {
              callback()
            } else {
              callback(new Error('请同意隐私条款和服务条款'))
            }
         }
       }
    ]
}

//3.获取form实例
const formRef =ref(null)
//4.获取路由参数
const router = useRouter()
console.log(router);

//登录按钮事件
const login = () => {
  const { account, password } = form.value; // 数据解构

  // console.log(formRef.value.validate());
    // Element UI 表单组件提供的内置方法 validate() 用于验证表单数据是否符合规则。
    formRef.value.validate(async (valid) => {
      // valid是所有表单通过效验返回true，未通过返回false
      if (valid) {
        //表单效验提供
        // 发送登录请求
        const res = await loginAPI({account,password})
        // console.log(res);
        //提示用户
        ElMessage({type:'success', message: '登录成功！'})
        // 2.跳转到首页
        router.replace({path:'/'}) //replace是替换当前（/login）路由
      } 
    })
      
} 
</script>


<template>
  <div>
    <header class="login-header">
      <div class="container m-top-20">
        <h1 class="logo">
          <RouterLink to="/">小兔鲜</RouterLink>
        </h1>
        <RouterLink class="entry" to="/">
          进入网站首页
          <i class="iconfont icon-angle-right"></i>
          <i class="iconfont icon-angle-right"></i>
        </RouterLink>
      </div>
    </header>
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:;">账户登录</a>
        </nav>
        <div class="account-box">
          <div class="form">
            <!-- ref是ref 可以访问 <el-form> 组件的所有方法和属性，无需通过事件或 props 传递。 -->
            <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="60px"
              status-icon>
              <!-- prop是...account是绑定的规则 -->
              <el-form-item prop="account" label="账户">
                <el-input v-model="form.account" placeholder="请输入账号-xiaotuxian001" clearable />
                  <template #prepend>
                    <i class="iconfont icon-user"></i>
                  </template>
              </el-form-item>
              <el-form-item prop="password" label="密码">
                <el-input v-model="form.password" placeholder="请输入密码-123456" clearable/>
              </el-form-item>
              <el-form-item label-width="22px" prop="agree">
                <el-checkbox  size="large" v-model="form.agree">
                  我已同意隐私条款和服务条款
                </el-checkbox>
              </el-form-item>
              <el-button size="large" class="subBtn" @click="login">点击登录</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </section>

    <footer class="login-footer">
      <div class="container">
        <p>
          <a href="javascript:;">关于我们</a>
          <a href="javascript:;">帮助中心</a>
          <a href="javascript:;">售后服务</a>
          <a href="javascript:;">配送与验收</a>
          <a href="javascript:;">商务合作</a>
          <a href="javascript:;">搜索推荐</a>
          <a href="javascript:;">友情链接</a>
        </p>
        <p>CopyRight &copy; 小兔鲜儿</p>
      </div>
    </footer>
  </div>
</template>

<style scoped lang='scss'>
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;

  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url("@/assets/images/logo.png") no-repeat center 18px / contain;
    }
  }

  .sub {
    flex: 1;
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 38px;
    margin-left: 20px;
    color: #666;
  }

  .entry {
    width: 120px;
    margin-bottom: 38px;
    font-size: 16px;

    i {
      font-size: 14px;
      color: $xtxColor;
      letter-spacing: -5px;
    }
  }
}

.login-section {
  background: url('@/assets/images/login-bg.png') no-repeat center / cover;
  height: 488px;
  position: relative;

  .wrapper {
    width: 380px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    nav {
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;

      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        text-align: center;
      }
    }
  }
}

.login-footer {
  padding: 30px 0 50px;
  background: #fff;

  p {
    text-align: center;
    color: #999;
    padding-top: 20px;

    a {
      line-height: 1;
      padding: 0 10px;
      color: #999;
      display: inline-block;

      ~a {
        border-left: 1px solid #ccc;
      }
    }
  }
}

.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      color: $xtxColor;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 20px 20px 20px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        >i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: $priceColor;
          }

          &.active,
          &:focus {
            border-color: $xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      >.error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: $priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: $xtxColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}

.subBtn {
  background: $xtxColor;
  width: 100%;
  color: #fff;
}
</style>
