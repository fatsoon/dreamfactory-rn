
export default class NetUtil {



    /*
     *  post请求
     *  urlSuffix:请求地址的后缀（usermginterface后面的部分，如/openaccount/query_memberinfo.do）
     *  params:参数
     *  callback:回调函数
     * */
    static post(urlSuffix, params, callback) {
        console.log(JSON.stringify(params));
        const server_url = 'http://2.dreampy.sinaapp.com/api/';
        //fetch请求
        fetch(server_url + urlSuffix, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params
        })
            .then((response) => {
                if(response.status == 200)
                    return response.json();
                else
                    return {code:-1,message:'请求服务器出错！（'+response.status+'）'};
            })
            .then((responseJSON) => {
                callback(responseJSON)
            })
            .catch((error) => {
                console.error(error);
                // alert(error);
                callback({code:-1,message:'网络请求失败'});
            })
    }

    /**
     * 投诉
     */
    static report(did, dream_uid, report_uid, report_type, callback) {
        this.post(
            'report',
            'did='+did+'&dream_uid='+dream_uid +'&report_uid='+report_uid+'&report_type='+report_type,
            callback,
        );
    }

    /**
     * 手机号登录
     */
    static login_via_phone(phone, password, callback) {
        this.post(
            'login_via_phone',
            'phone='+phone+'&password='+password,
            callback,
        );
    }

    /**
     * 发送验证码
     */
    static send_valcode(phone, callback) {
        this.post(
            'send_valcode',
            'phone='+phone,
            callback,
        );
    }

    /**
     * 手机号注册
     */
    static register_via_phone(phone, password, valcode, callback) {
        this.post(
            'register_via_phone',
            'phone='+phone+'&password='+password + '&valcode='+valcode,
            callback,
        );
    }

    /**
     * 热门列表
     */
    static hot_dreams(uid, limit, offset, callback) {
        this.post(
            'hot_dreams',
            'uid='+uid+'&limit='+limit + '&offset='+offset,
            callback,
        );
    }

    /**
     * 最新列表
     */
    static latest_dreams(uid, limit, offset, callback) {
        this.post(
            'latest_dreams',
            'uid='+uid+'&limit='+limit + '&offset='+offset,
            callback,
        );
    }

    /**
     * 获取别人的梦
     */
    static user_dreams(uid, myUid, limit, offset, callback) {
        this.post(
            'user_dreams',
            'uid='+uid+'&limit='+limit + '&offset='+offset + '&my_uid=' + myUid,
            callback,
        );
    }

    /**
     * 我的梦列表
     */
    static my_dreams(uid, limit, offset, callback) {
        this.post(
            'my_dreams',
            'uid='+uid+'&limit='+limit + '&offset='+offset,
            callback,
        );
    }

    /**
     * 我赞过的梦列表
     */
    static my_up_dreams(uid, limit, offset, callback) {
        this.post(
            'my_up_dreams',
            'uid='+uid+'&limit='+limit + '&offset='+offset,
            callback,
        );
    }

    /**
     * 获取梦的所有评论
     */
    static get_dream_comments(did, callback) {
        this.post(
            'get_dream_comments',
            'did='+did,
            callback,
        );
    }

    /**
     * 添加评论
     */
    static add_comment(uid, did, content, callback) {
        this.post(
            'add_comment',
            'uid='+uid+'&did='+did + '&content='+content,
            callback,
        );
    }

    /**
     * 点赞
     */
    static up_dream(uid, did, callback) {
        this.post(
            'up_dream',
            'uid='+uid+'&did='+did,
            callback,
        );
    }

    /**
     * 取消点赞
     */
    static cancel_up_dream(uid, did, callback) {
        this.post(
            'cancel_up_dream',
            'uid='+uid+'&did='+did,
            callback,
        );
    }

    /**
     * 修改密码
     */
    static update_password(uid, oldPassword, newPassword, callback) {
        this.post(
            'update_password',
            'uid='+uid+'&oldpassword='+oldPassword+'&password='+newPassword,
            callback,
        );
    }

    /**
     * 修改邮箱
     */
    static update_email(uid, email, callback) {
        this.post(
            'update_email',
            'uid='+uid+'&email='+email,
            callback,
        );
    }

    /**
     * 修改昵称
     */
    static update_nickname(uid, nickname, callback) {
        this.post(
            'update_nickname',
            'uid='+uid+'&nickname='+nickname,
            callback,
        );
    }

    /**
     * 添加梦
     */
    static add_dream(uid, content, callback) {
        this.post(
            'add_dream',
            'uid='+uid+'&content='+content,
            callback,
        );
    }

    /**
     * 获取用户信息
     */
    static get_user_info(uid, callback) {
        this.post(
            'get_user_info',
            'uid='+uid,
            callback,
        );
    }
}
