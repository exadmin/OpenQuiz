var simpleQuiz = (function () {
    var initModule = function ( $container ) {
        $container.html(
            simpleQuiz.shell.initModule( $container )
        );
    };
    return { initModule: initModule};
}());