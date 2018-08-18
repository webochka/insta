this["templates"] = this["templates"] || {};
this["templates"]["404"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h1>Page not found</h1>\n<a href=\"/\">Go to main page</a>\n";
},"useData":true});
Handlebars.registerPartial("form-submit", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"form-submit f f-align-1-2 f-gap-2\">\n  <button type=\"submit\" class=\"btn btn-primary btn-mw-sm\">"
    + container.escapeExpression(((helper = (helper = helpers["btn-text"] || (depth0 != null ? depth0["btn-text"] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"btn-text","hash":{},"data":data}) : helper)))
    + "</button>\n  <i class=\"fa fa-spinner fa-lg fa-spin\"></i>\n  <span class=\"text-success\">\n    <i class=\"fa fa-check\"></i> Success!\n  </span>\n  <span class=\"text-danger\">\n    <i class=\"fa fa-exclamation-triangle\"></i> Error!\n  </span>\n</div>\n";
},"useData":true}));
this["templates"]["add"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "        <button\n          class=\"editor__presets-item\"\n          data-filter=\""
    + alias2(alias1(depth0, depth0))
    + "\"\n          style=\"background-image:url('img/filters/"
    + alias2(alias1(depth0, depth0))
    + ".png')\">\n          <span>"
    + alias2(alias1(depth0, depth0))
    + "</span>\n        </button>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.header,depth0,{"name":"header","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<div class=\"container-fluid\">\n\n  <div id=\"editor\" class=\"editor\">\n    <div class=\"editor__canvas-container\">\n      <i class=\"fa fa-spinner fa-4x fa-spin\"></i>\n    </div>\n\n    <label class=\"editor__uploader\" title=\"Upload picture\">\n      <span class=\"editor__uploader-inner\">\n        <i class=\"fa fa-picture-o\"></i>\n        <i class=\"fa fa-plus\"></i>\n      </span>\n      <input type=\"file\" accept=\"image/*\">\n    </label>\n\n    <div class=\"editor__presets\">\n      <div class=\"editor__presets-track\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.filters : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </div>\n    </div>\n\n    <div class=\"editor__caption form-group\">\n      <textarea class=\"form-control\" name=\"caption\" placeholder=\"Caption...\"></textarea>\n    </div>\n\n    <div class=\"editor__controls f f-gap-1 u-mt-2\">\n      <button class=\"editor__reset btn btn-default btn-block\">Reset</button>\n      <button class=\"editor__upload btn btn-success btn-block\">\n        <i class=\"fa fa-upload\"></i> <span>Upload</span>\n      </button>\n    </div>\n\n    <div class=\"editor__progress progress\">\n      <div class=\"progress-bar progress-bar-success progress-bar-striped active\" style=\"width: 40%\"></div>\n    </div>\n\n  </div>\n\n</div>\n";
},"usePartial":true,"useData":true});
Handlebars.registerPartial("header", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "      <a href=\"/add\" class=\"btn btn-default btn-sm\">\n        <i class=\"fa fa-plus\"></i>\n        <span>Add photo</span>\n      </a>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    <div class=\"header-user dropdown\">\n      <div class=\"header-user__main\" data-toggle=\"dropdown\">\n        <span class=\"header-user__pic\"\n              "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.photoURL : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n        </span>\n        "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.username : stack1), depth0))
    + "\n        <span class=\"caret\"></span>\n      </div>\n\n      <ul class=\"dropdown-menu\">\n        <li><a href=\"/profile\">Profile</a></li>\n        <li><a href=\"/profile/edit\">Edit profile</a></li>\n        <li class=\"divider\"></li>\n        <li><a href=\"/logout\">Logout</a></li>\n      </ul>\n    </div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "style=\"background-image:url('"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.photoURL : stack1), depth0))
    + "')\"";
},"6":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"header__login\">\n      <a href=\"/login\" class=\"btn btn-default btn-sm btn-mw-sm\">Log In</a>\n      <span>or</span>\n      <a href=\"/signup\" class=\"btn btn-primary btn-sm btn-mw-sm\">Sign Up</a>\n    </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<header class=\"header\">\n  <div class=\"header__inner\">\n\n    <div class=\"header__left\">\n      <a href=\"/\" class=\"header__logo logotype\">\n        <span class=\"sr-only\">Instaprjct</span>\n      </a>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.user : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.profile : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + "\n  </div>\n</header>\n";
},"useData":true}));
this["templates"]["login"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.header,depth0,{"name":"header","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<div class=\"container-fluid\">\n\n  <form id=\"login-form\">\n\n    <div class=\"row\">\n      <div class=\"col-sm-6 col-sm-offset-3\">\n\n        <div class=\"form-group\">\n          <label>Email</label>\n          <input type=\"text\" class=\"form-control\" name=\"email\">\n          <span></span>\n        </div>\n\n        <div class=\"form-group\">\n          <label>Password</label>\n          <input type=\"password\" class=\"form-control\" name=\"password\">\n          <span></span>\n        </div>\n\n        <button type=\"submit\" class=\"btn btn-primary\">Log In</button>\n\n      </div>\n    </div>\n\n  </form>\n\n</div>\n";
},"usePartial":true,"useData":true});
this["templates"]["main"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "<div class=\"feed\" id=\"feed\"></div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "<div class=\"welcome-screen\">\n  <h1 class=\"welcome-screen__logotype logotype\"><div class=\"sr-only\">Instaprjct</div></h1>\n</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.header,depth0,{"name":"header","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.user : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
Handlebars.registerPartial("post", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "      <img src=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.author : depth0)) != null ? stack1.photoURL : stack1), depth0))
    + "\" alt=\"Users avatar picture\">\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "      <img src=\"img/user.svg\" alt=\"Default users avatar picture\">\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "  <ul class=\"post__comments-list\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.comments : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </ul>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "     <li class=\"comment\" data-comment=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\">\n      <span class=\"comment__author\">"
    + alias2(alias1((depth0 != null ? depth0.author : depth0), depth0))
    + "</span>\n      <span class=\"comment__text\">"
    + alias2(alias1((depth0 != null ? depth0.value : depth0), depth0))
    + "</span>\n      <small class=\"comment__time\">"
    + alias2(alias1((depth0 != null ? depth0.created : depth0), depth0))
    + "</small>\n    </li>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "fa-heart";
},"10":function(container,depth0,helpers,partials,data) {
    return "fa-heart-o";
},"12":function(container,depth0,helpers,partials,data) {
    var helper;

  return "      <span>"
    + container.escapeExpression(((helper = (helper = helpers.likesCount || (depth0 != null ? depth0.likesCount : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"likesCount","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"14":function(container,depth0,helpers,partials,data) {
    return "    <button class=\"post__delete btn btn-danger btn-xs\" title=\"Delete\">\n      <span class=\"fa fa-trash\"></span>\n      <span>Delete</span>\n    </button>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=helpers.helperMissing, alias4="function";

  return "<header class=\"post__header\">\n  <div class=\"post__author\">\n    <div class=\"post__author-pic\">\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.author : depth0)) != null ? stack1.photoURL : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "    </div>\n    <span class=\"post__author-name\">"
    + alias2(container.lambda(((stack1 = (depth0 != null ? depth0.author : depth0)) != null ? stack1.username : stack1), depth0))
    + "</span>\n  </div>\n  <span class=\"post__time\">"
    + alias2(((helper = (helper = helpers.created || (depth0 != null ? depth0.created : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias1,{"name":"created","hash":{},"data":data}) : helper)))
    + "</span>\n</header>\n\n<div class=\"post__content\">\n  <img src=\""
    + alias2(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + alias2(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\">\n</div>\n\n<footer class=\"post__footer\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.comments : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  <div class=\"f f-align-1-2\">\n    <button class=\"post__like\">\n      <span class=\"fa "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.liked : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(10, data, 0),"data":data})) != null ? stack1 : "")
    + "\"></span>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.likesCount : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </button>\n    <form class=\"post__add-comment\">\n      <input type=\"text\" name=\"comment\" placeholder=\"Add a comment...\">\n    </form>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isOwner : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n</footer>\n";
},"useData":true}));
this["templates"]["profile-edit"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "style=\"background-image: url('"
    + container.escapeExpression(((helper = (helper = helpers.photoURL || (depth0 != null ? depth0.photoURL : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"photoURL","hash":{},"data":data}) : helper)))
    + "')\"";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return ((stack1 = container.invokePartial(partials.header,depth0,{"name":"header","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<div class=\"container-fluid\">\n\n  <div class=\"profile\">\n    <div class=\"u-mb-4\">\n      <a class=\"btn btn-default btn-sm\" href=\"/profile\">\n        <i class=\"fa fa-arrow-left\"></i>\n        <span>Profile</span>\n      </a>\n    </div>\n\n    <div class=\"profile__left\">\n\n      <form class=\"profile-picture\" id=\"profile-picture\">\n        <div class=\"profile-picture__picture\" "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.photoURL : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n          <label class=\"profile-picture__trigger\" title=\"Change picture\">\n            <span>Choose a new picture</span>\n            <input type=\"file\" name=\"picture\" accept=\"image/*\">\n          </label>\n        </div>\n\n        <div class=\"profile-picture__error alert alert-danger\"></div>\n\n        <div class=\"profile-picture__actions f f-gap-2 f-align-1-2\">\n          <button class=\"btn btn-success btn-sm btn-block\" data-action=\"save\">\n            <i class=\"fa fa-upload\"></i> Save\n          </button>\n\n          <button class=\"btn btn-danger btn-sm btn-block u-my-0\" data-action=\"cancel\">\n            <i class=\"fa fa-ban\"></i> Cancel\n          </button>\n        </div>\n\n        <div class=\"progress\">\n          <div class=\"progress-bar progress-bar-success progress-bar-striped active\"></div>\n        </div>\n      </form>\n\n    </div>\n\n    <div class=\"profile__body\" id=\"profile__body\">\n\n      <div class=\"profile__errors alert alert-danger\" hidden></div>\n\n      <form class=\"form panel panel-default\" id=\"public-info\" novalidate>\n        <header class=\"panel-heading\">\n          <h3 class=\"panel-title\">Public information</h3>\n        </header>\n\n        <div class=\"panel-body\">\n\n          <div class=\"form-group\">\n            <label>Username</label>\n            <div class=\"form-control\"readonly>"
    + alias4(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data}) : helper)))
    + "</div>\n          </div>\n\n          <div class=\"form-group\">\n            <label>Display Name</label>\n            <input\n              type=\"text\"\n              name=\"displayName\"\n              class=\"form-control\"\n              value=\""
    + alias4(((helper = (helper = helpers.displayName || (depth0 != null ? depth0.displayName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"displayName","hash":{},"data":data}) : helper)))
    + "\"\n              data-validators=\"displayName\">\n              <span></span>\n          </div>\n\n          <div class=\"form-group\">\n            <label>Phone</label>\n            <input\n              type=\"tel\"\n              name=\"phoneNumber\"\n              class=\"form-control\"\n              value=\""
    + alias4(((helper = (helper = helpers.phoneNumber || (depth0 != null ? depth0.phoneNumber : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"phoneNumber","hash":{},"data":data}) : helper)))
    + "\"\n              data-validators =\"phoneNumber\">\n              <span></span>\n          </div>\n\n          <div class=\"form-group\">\n            <label>About me</label>\n            <textarea class=\"form-control\" name=\"about\" \n            data-validators =\"empty\">"
    + alias4(((helper = (helper = helpers.about || (depth0 != null ? depth0.about : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"about","hash":{},"data":data}) : helper)))
    + "</textarea>\n            <span></span>\n          </div>\n\n          <hr>\n\n          <div class=\"form-group\">\n            <label>Twitter</label>\n            <div class=\"input-group\">\n              <span class=\"input-group-addon\"><i class=\"fa fa-twitter\"></i></span>\n              <input\n                type=\"text\"\n                name=\"socialTwitter\"\n                class=\"form-control\"\n                value=\""
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.social : depth0)) != null ? stack1.twitter : stack1), depth0))
    + "\" \n                data-validators =\"empty\">\n                <span></span>\n\n            </div>\n          </div>\n\n          <div class=\"form-group\">\n            <label>Facebook</label>\n            <div class=\"input-group\">\n              <span class=\"input-group-addon\"><i class=\"fa fa-facebook\"></i></span>\n              <input type=\"text\"\n                name=\"socialFacebook\"\n                class=\"form-control\"\n                value=\""
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.social : depth0)) != null ? stack1.facebook : stack1), depth0))
    + "\"\n                data-validators =\"empty\">\n                <span></span>\n            </div>\n          </div>\n\n          <div class=\"form-group\">\n            <label>Vkontakte</label>\n            <div class=\"input-group\">\n              <span class=\"input-group-addon\"><i class=\"fa fa-vk\"></i></span>\n              <input\n                type=\"text\"\n                name=\"socialVkontakte\"\n                class=\"form-control\"\n                value=\""
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.social : depth0)) != null ? stack1.vkontakte : stack1), depth0))
    + "\"\n                data-validators =\"empty\">\n                <span></span>\n            </div>\n          </div>\n\n          <div class=\"form-group\">\n            <label> Personal website</label>\n            <div class=\"input-group\">\n              <span class=\"input-group-addon\"><i class=\"fa fa-globe\"></i></span>\n              <input\n                type=\"text\"\n                name=\"socialWebsite\"\n                class=\"form-control\"\n                value=\""
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.social : depth0)) != null ? stack1.website : stack1), depth0))
    + "\" \n                data-validators =\"empty\">\n                <span></span>\n            </div>\n          </div>\n        </div>\n        <footer class=\"panel-footer\">\n          <div class=\"f f-align-13-2\">\n"
    + ((stack1 = container.invokePartial(partials["form-submit"],depth0,{"name":"form-submit","hash":{"btn-text":"Save"},"data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "          </div>\n        </footer>\n      </form>\n\n\n\n      <form class=\"panel panel-default\" id=\"changePassword\" novalidate>\n        <header class=\"panel-heading\">\n          <h3 class=\"panel-title\">Change password</h3>\n        </header>\n        <div class=\"panel-body\">\n\n         \n      <div class=\"form-group\">\n         \n          <p>Current password</p>\n          <input\n              type=\"password\"\n              name=\"passwordControl\"\n              class=\"form-control\"\n              value=\""
    + alias4(((helper = (helper = helpers.password || (depth0 != null ? depth0.password : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"password","hash":{},"data":data}) : helper)))
    + "\">\n              <span class=\"text-danger\"></span>\n          </div>\n                       \n          \n         <div class=\"form-group change_pasword--hidden\">\n            <p>New password</p>\n            <input type=\"password\" name=\"NewPassword\" class=\"form-control\" value=\""
    + alias4(((helper = (helper = helpers.password || (depth0 != null ? depth0.password : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"password","hash":{},"data":data}) : helper)))
    + "\">\n            <span class=\"text-danger\"></span>\n         </div>\n      </div>\n      \n       <footer class=\"panel-footer\">\n           <div class=\"f f-align-13-2\">\n"
    + ((stack1 = container.invokePartial(partials["form-submit"],depth0,{"name":"form-submit","hash":{"btn-text":"Save"},"data":data,"indent":"               ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "            </div>\n        </footer>\n         \n       \n      </form>\n\n      <form class=\"panel panel-danger\" id=\"delete-profile\">\n        <header class=\"panel-heading\">\n          <h3 class=\"panel-title\">\n            Delete account\n          </h3>\n        </header>\n        <div class=\"panel-body\">\n          <p class=\"text-danger\">\n            Attention!!!\n            Once you delete your account, there is no going back.\n            Please be certain.\n          </p>\n          <p>For confirm account deletion you should enter your username into this field:</p>\n          <div class=\"row\">\n            <div class=\"col-xs-9 u-pr-0\">\n              <input type=\"hidden\" value=\""
    + alias4(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data}) : helper)))
    + "\" name=\"username\">\n              <div class=\"form-group u-mb-0\">\n                <input type=\"text\" class=\"form-control\" name=\"usernameConfirm\">\n                <span></span>\n              </div>\n            </div>\n            <div class=\"col-xs-3\">\n              <button class=\"btn btn-danger btn-block\">Delete</button>\n            </div>\n          </div>\n        </div>\n      </form>\n\n    </div>\n  </div>\n\n</div>\n";
},"usePartial":true,"useData":true});
this["templates"]["profile-show"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "  <div class=\"profile profile--show\">\n    <div class=\"profile__pic\""
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.photoURL : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "></div>\n\n    <p class=\"profile__name\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.displayName : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0, blockParams),"inverse":container.program(6, data, 0, blockParams),"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "    </p>\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.publicEmail : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.phoneNumber : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.about : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "\n    <ul class=\"profile__social\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.social : depth0),{"name":"each","hash":{},"fn":container.program(14, data, 2, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "    </ul>\n\n    <a href=\"/profile/edit\" class=\"btn btn-default\">\n      <i class=\"fa fa-pencil\"></i>\n      <span>Edit profile</span>\n    </a>\n  </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper;

  return " style=\"background-image: url('"
    + container.escapeExpression(((helper = (helper = helpers.photoURL || (depth0 != null ? depth0.photoURL : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"photoURL","hash":{},"data":data}) : helper)))
    + "')\"";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "      "
    + alias4(((helper = (helper = helpers.displayName || (depth0 != null ? depth0.displayName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"displayName","hash":{},"data":data}) : helper)))
    + " <br> <small>("
    + alias4(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data}) : helper)))
    + ")</small>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return "      "
    + container.escapeExpression(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"username","hash":{},"data":data}) : helper)))
    + "\n";
},"8":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <p class=\"profile__email\">\n      <a href=\"mailto:"
    + alias4(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data}) : helper)))
    + "\"><i class=\"fa fa-envelope-o\"></i> "
    + alias4(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data}) : helper)))
    + "</a>\n    </p>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <p class=\"profile__phone\">\n      <a href=\"tel:"
    + alias4(((helper = (helper = helpers.phoneNumber || (depth0 != null ? depth0.phoneNumber : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"phoneNumber","hash":{},"data":data}) : helper)))
    + "\"><i class=\"fa fa-phone\"></i> "
    + alias4(((helper = (helper = helpers.phoneNumber || (depth0 != null ? depth0.phoneNumber : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"phoneNumber","hash":{},"data":data}) : helper)))
    + "</a>\n    </p>\n";
},"12":function(container,depth0,helpers,partials,data) {
    var helper;

  return "    <p class=\"profile__about\">"
    + container.escapeExpression(((helper = (helper = helpers.about || (depth0 != null ? depth0.about : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"about","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"14":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),blockParams[0][0],{"name":"if","hash":{},"fn":container.program(15, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"15":function(container,depth0,helpers,partials,data,blockParams) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "      <li><a href=\""
    + alias3((helpers.socialLinkFor || (depth0 && depth0.socialLinkFor) || alias2).call(alias1,blockParams[1][1],blockParams[1][0],{"name":"socialLinkFor","hash":{},"data":data,"blockParams":blockParams}))
    + "\" target=\"_blank\" title=\""
    + alias3((helpers.socialLinkFor || (depth0 && depth0.socialLinkFor) || alias2).call(alias1,blockParams[1][1],blockParams[1][0],{"name":"socialLinkFor","hash":{},"data":data,"blockParams":blockParams}))
    + "\">\n        <i class=\""
    + alias3((helpers.socialIconFor || (depth0 && depth0.socialIconFor) || alias2).call(alias1,blockParams[1][1],{"name":"socialIconFor","hash":{},"data":data,"blockParams":blockParams}))
    + "\"></i>\n      </a></li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.header,depth0,{"name":"header","data":data,"blockParams":blockParams,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<div class=\"container-fluid\">\n\n"
    + ((stack1 = helpers["with"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.profile : depth0),{"name":"with","hash":{},"fn":container.program(1, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "\n</div>\n";
},"usePartial":true,"useData":true,"useBlockParams":true});
this["templates"]["profile"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <form class=\"profile\" id=\"edit-profile\">\n      <div class=\"profile__left\">\n        <div class=\"profile__pic\" "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.photoURL : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n          <label class=\"profile__pic-uploader\" title=\"Change picture\">\n            <input type=\"file\" name=\"picture\" accept=\"image/*\">\n          </label>\n        </div>\n      </div>\n\n      <div class=\"profile__body\">\n\n        <div class=\"profile__errors alert alert-danger\" hidden></div>\n\n        <div class=\"panel panel-default\">\n          <header class=\"panel-heading\">\n            <h3 class=\"panel-title\">Common info</h3>\n          </header>\n          <div class=\"panel-body\">\n\n            <div class=\"form-group\">\n              <label for=\"name\">Name</label>\n              <input type=\"text\" name=\"name\" class=\"form-control\" value=\""
    + alias4(((helper = (helper = helpers.displayName || (depth0 != null ? depth0.displayName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"displayName","hash":{},"data":data}) : helper)))
    + "\" readonly>\n            </div>\n\n            <div class=\"form-group\">\n              <label>Email</label>\n              <div class=\"form-control\" readonly>"
    + alias4(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data}) : helper)))
    + "</div>\n            </div>\n\n            <div class=\"form-group\">\n              <label>UID</label>\n              <div class=\"form-control\" readonly>"
    + alias4(((helper = (helper = helpers.uid || (depth0 != null ? depth0.uid : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"uid","hash":{},"data":data}) : helper)))
    + "</div>\n            </div>\n\n         \n\n          <div class=\"form-group\">\n              <label>Phone number</label>\n              <div class=\"form-control\" readonly> "
    + alias4(((helper = (helper = helpers.phoneNumber || (depth0 != null ? depth0.phoneNumber : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"phoneNumber","hash":{},"data":data}) : helper)))
    + " </div>\n          </div>\n          \n\n          <div class=\"form-group\">\n            <label>About me</label>\n            <textarea class=\"form-control\" name=\"about\" readonly>"
    + alias4(((helper = (helper = helpers.about || (depth0 != null ? depth0.about : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"about","hash":{},"data":data}) : helper)))
    + "</textarea>\n          </div>\n      \n          <div class=\"form-group\">\n            <label>Twitter</label>\n            <div class=\"input-group\">\n              <span class=\"input-group-addon\"><i class=\"fa fa-twitter\"></i></span>\n              <div  class=\"form-control\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.socialTwitter : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "              </div>\n            </div>\n          </div>\n\n          <div class=\"form-group\">\n            <label>Facebook</label>\n            <div class=\"input-group\">\n              <span class=\"input-group-addon\"><i class=\"fa fa-facebook\"></i></span>\n               <div  class=\"form-control\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.socialFacebook : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "              </div>\n            </div>\n          </div>\n\n           <div class=\"form-group\">\n            <label>Vkontakte</label>\n            <div class=\"input-group\">\n              <span class=\"input-group-addon\"><i class=\"fa fa-vk\"></i></span>\n               <div  class=\"form-control\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.socialVkontakte : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "              </div>\n            </div>\n          </div>\n      \n\n        <div class=\"form-group\">\n            <label> Personal website</label>\n            <div class=\"input-group\">\n              <span class=\"input-group-addon\"><i class=\"fa fa-globe\"></i></span>\n               <div  class=\"form-control\">\n              <a><"
    + alias4(((helper = (helper = helpers.socialWebsite || (depth0 != null ? depth0.socialWebsite : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"socialWebsite","hash":{},"data":data}) : helper)))
    + "a/>\n              </div>\n          </div>\n        </div>\n\n  </div>\n\n          <div class=\"panel-footer\">\n\n            <div class=\"profile__actions\">\n              <button class=\"btn btn-default btn-mw-sm\" data-profile-action=\"edit\">\n                <i class=\"fa fa-pencil\"></i>\n                <span>Edit</span>\n              </button>\n            </div>\n\n            <div class=\"profile__actions profile__actions--edit\">\n              <div class=\"f f-gap-3 f-align-1-2\">\n                <button class=\"btn btn-primary btn-mw-sm\" data-profile-action=\"save\">\n                  <i class=\"fa fa-trash\"></i>\n                  <span>Save</span>\n                </button>\n\n                <button class=\"btn btn-default btn-mw-sm\" data-profile-action=\"cancel\">\n                  <i class=\"fa fa-trash\"></i>\n                  <span>Cancel</span>\n                </button>\n\n                <i class=\"fa fa-spinner fa-lg fa-spin\"></i>\n              </div>\n\n              <button class=\"btn btn-danger btn-mw-sm\" data-profile-action=\"delete\">\n                <i class=\"fa fa-trash\"></i>\n                <span>Delete account</span>\n              </button>\n            </div>\n          </div>\n        </div>\n\n      </div>\n    </form>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper;

  return " style=\"background-image: url('"
    + container.escapeExpression(((helper = (helper = helpers.photoURL || (depth0 != null ? depth0.photoURL : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"photoURL","hash":{},"data":data}) : helper)))
    + "')\"";
},"4":function(container,depth0,helpers,partials,data) {
    var helper;

  return "              <a> https://twitter.com/"
    + container.escapeExpression(((helper = (helper = helpers.socialTwitter || (depth0 != null ? depth0.socialTwitter : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"socialTwitter","hash":{},"data":data}) : helper)))
    + "</a>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                <a> https://www.facebook.com/"
    + container.escapeExpression(((helper = (helper = helpers.socialFacebook || (depth0 != null ? depth0.socialFacebook : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"socialFacebook","hash":{},"data":data}) : helper)))
    + "</a>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var helper;

  return "              <a> https://vk.com/"
    + container.escapeExpression(((helper = (helper = helpers.socialVkontakte || (depth0 != null ? depth0.socialVkontakte : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"socialVkontakte","hash":{},"data":data}) : helper)))
    + "</a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.header,depth0,{"name":"header","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<div class=\"container-fluid\">\n\n  <div class=\"container\">\n"
    + ((stack1 = helpers["with"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.user : depth0),{"name":"with","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n\n</div>\n";
},"usePartial":true,"useData":true});
this["templates"]["signup"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.header,depth0,{"name":"header","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<div class=\"container-fluid\">\n\n  <form id=\"signup-form\" class=\"form\">\n\n    <div class=\"row\">\n      <div class=\"col-sm-6 col-sm-offset-3\">\n\n        <ul id=\"errors\" class=\"list-group\" hidden></ul>\n\n        <div class=\"form-group\">\n          <label class=\"control-label\">Email</label>\n          <input type=\"text\" class=\"form-control\" name=\"email\">\n          <span class=\"help-block\"></span>\n        </div>\n\n        <div class=\"form-group\">\n          <label class=\"control-label\">Username</label>\n          <input type=\"text\" class=\"form-control\" name=\"username\">\n          <span class=\"help-block\"></span>\n        </div>\n\n        <div class=\"form-group\">\n          <label class=\"control-label\">Name</label>\n          <input type=\"text\" class=\"form-control\" name=\"displayName\">\n          <span class=\"help-block\"></span>\n        </div>\n\n        <div class=\"form-group\">\n          <label class=\"control-label\">Password</label>\n          <input type=\"password\" class=\"form-control\" name=\"password\">\n          <span class=\"help-block\"></span>\n        </div>\n\n        <div class=\"form-group\">\n          <label class=\"control-label\">Confirm password</label>\n          <input type=\"password\" class=\"form-control\" name=\"passwordConfirm\">\n          <span class=\"help-block\"></span>\n        </div>\n\n"
    + ((stack1 = container.invokePartial(partials["form-submit"],depth0,{"name":"form-submit","hash":{"btn-text":"Sign Up"},"data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\n      </div>\n    </div>\n\n  </form>\n\n</div>\n";
},"usePartial":true,"useData":true});
this["templates"]["preloader"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"container-fluid\">\n  <div class=\"f f-align-2-2\" style=\"height: 300px\">\n    <div class=\"fa fa-spinner fa-spin fa-5x\"></div>\n  </div>\n</div>\n";
},"useData":true});