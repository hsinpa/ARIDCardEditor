/**
 * @author hsinpa 
 */

var UIViewUtil = function () {

};

UIViewUtil.prototype.CreateCenterModal = function() {
    var domElement = this.GetCenterModalDom();
    $("body").append(domElement);
    
    //var centerModalDom = $("#center_modal");
    $("#center_modal button").click(function()  {
        $(this).parent().css("visibility", "hidden");
    });
}

UIViewUtil.prototype.GetCenterModalDom = function() {
    return "<div id='center_modal'>"+
                "<div class='content'>Hello</div>"+
                "<button>x</button>"+
            "</div>";
}
