/**
 * @author hsinpa 
 */

var UIViewUtil = function () {
    $(".center_modal button").click(function()  {
        $(this).parent().css("visibility", "hidden");
    });
};

/**
 * Grant File Permission
 * @param {string} rawModalString file id
 */
UIViewUtil.prototype.CreateCenterModal = function(rawModalString) {
    $("body").append(rawModalString);
}

UIViewUtil.prototype.GetQRCodeModalDom = function() {
    return "<div id='qrcode_modal' class='center_modal'>"+
                "<div class='content'></div>"+
                "<canvas id='qr_canvas'></canvas>"+
                "<button>x</button>"+
            "</div>";
}

UIViewUtil.prototype.GetInputBoxModalDom = function() {
    return "<div id='inputbox_modal' class='center_modal'>"+
                "<div class='content'>"+
                '<label for="custom_inputfield">Input Box</label>'+
                "<input type='text' name='custom_inputfield' id='custom_inputfield'>"+
                "</div>"+
                "<button>x</button>"+
            "</div>";
}