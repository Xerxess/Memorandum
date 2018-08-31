/**
 * 常用验证对象
 */
/*
 验证对象
 */
var validator = {
    isMail: function (str) {
        var re = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if (re.test(str)) {
            return true;
        } else {
            return false;
        }
    },
    checkUser: function (str) {
        var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_-]{6,20}$/;
        if (reg.test(str)) {
            return true;
        }
        else {
            return false;
        }
    },
    //非空验证
    isNull: function (str) {
        if ($.trim(str) == '') {
            return false;
        }
        return true;
    },
    //字符串是否有空字符
    isStringNull: function (str) {
        var n_reg = /\s+/;
        if (n_reg.test(str)) {
            return false;
        }
        return true;
    },
    //验证字符范围
    strLen: function (str, len, len2) {
        if (str.length < len || str.length > len2) {
            return false;
        }
        return true;
    },
    //密码比较
    pwdCompare: function (str1, str2) {
        if (str1 != str2) {
            return false;
        }
        return true;
    },
    //带区号的
    isTel: function (str) {
        var reg = /^((0\d{2,3})-?)?(\d{7,8})(-(\d{3,}))?$/;
        if (!reg.test(str)) {
            return false;
        }
        return true;
    },
    //手机验证
    Phone: function (phone) {
        var reg = /^1[3456789]{1}[0-9]{9}$/;
        return reg.test(phone);
    },
    //密码强度
    checkStrong: function (sValue) {
        /** 强度规则
         + ------------------------------------------------------- +
         1) 任何少于6个字符的组合，弱；任何字符数的同类字符组合，弱；
         2) 任何字符数的两类字符组合，中；
         3) 12位字符数以下的三类或四类字符组合，强；
         4) 12位字符数以上的三类或四类字符组合，非常好。
         + ------------------------------------------------------- +
         **/
        var modes = 0;
        if (sValue.length < 6)
            return modes;
        if (/\d/.test(sValue))
            modes++; //数字
        if (/[a-z]/.test(sValue))
            modes++; //小写
        if (/[A-Z]/.test(sValue))
            modes++; //大写 
        if (/\W/.test(sValue))
            modes++; //特殊字符
        switch (modes) {
            case 1:
                return 1;
                break;
            case 2:
                return 2;
                break;
            case 3:
                if (sValue.length >= 12) {
                    return 4;
                }
                return sValue.length > 10 ? 3 : 2;
                break;
            case 4:
                return sValue.length > 12 ? 4 : 3;
                break;
        }
    },
    //15位和18位身份证号码的正则表达式
    isIdCard: function (idCard) {
        var regIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        return regIdCard.test(idCard);
    },
    //6位验证码
    isCode: function (str) {
        if (!this.v_str_s(str))
            return false;
        var reg1 = /^\d{6}$/;
        if (!reg1.test(str))
            return false;
        return true;
    }
};