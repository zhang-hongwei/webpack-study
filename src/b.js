let { SyncHook } = require("tapable");

class Lesson {
    constructor() {
        this.hooks = {
            arch: new SyncHook(["name"])
        };
    }

    start() {
        this.hooks.arch.call("zhw");
    }

    tap() {
        this.hooks.arch.tap("node", function(name) {
            console.log("statt==1=>", name);
        });

        this.hooks.arch.tap("react", function(name) {
            console.log("statt==2=>", name);
        });
    }
}

let l = new Lesson();

l.tap();
l.start();
