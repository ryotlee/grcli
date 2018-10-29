define([], function() {
	var userName = ''
    /**
     * 启动应用
     */
    function startup() {
       sayHello("Ryot")
    }

    function sayHello(username) {
      console.log('Hello ' + username)
    }

    return {
        startup: startup
    }
})