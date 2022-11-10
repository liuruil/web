// "use strict";

function a() {
    console.log(this.a)
}
a.call(null)