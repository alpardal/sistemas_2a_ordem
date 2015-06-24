Utils = {
    Functions: {
        limit:  function(fn, timeLimit) {
                    var id = null;
                    return function() {
                        args = arguments;
                        if (id) {
                            clearTimeout(id);
                        }
                        id = setTimeout(function () {
                            id = null;
                            fn.call(null, args);
                        }, timeLimit);
                    };
                }
    }
}
