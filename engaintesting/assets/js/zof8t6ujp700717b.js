$("a.btn-fav").click(function () {
    $(".nPlatform").addClass("d-none");
    $("ul.nav li a.active").removeClass("active");
    $(this).addClass("active");
    $(".nwo-cat-btn[data-change-cat='']").click();

    $("select#orderform-service option").remove();
    $("select#orderform-category-copy option").remove();
    $(".form-group.fields").addClass("hidden");
    $("span#s_desc").html("Select services...");
    $("span#s_name").html("Select services...");
    $("input#charge").val("");

    let services = window.modules.siteOrder;
    // loop services
    let count = 0;
    $.each(services, function (index, value) {
        if (index == "services") {
            $("select#orderform-category-copy").html("");
            // loop services
            $.each(value, function (index, value) {
                // get this val
                let this_val = value.id;
                if (getCookie("favorite_service_" + this_val)) {
                    let cat_id = value.cid;

                    $("select#orderform-category option:not([remove='false'])").each(function () {
                        if ($(this).val() != cat_id) {
                            $(this).attr("remove", "true");
							  $("#orderform-service").change(function() {
        setList(0);
    });
    $("#orderform-category").change(function() {
        setList(1);
    });
                        } else {
                            $(this).attr("remove", "false");
                        }
                    });
                    count++;
                }
            });
        }
    });

    $("select#orderform-category option[remove='true']").remove();

    if (count == 0) {
        setCookie("favorite_service_496", '496', 496);
        let cid = window.modules.siteOrder.services[3].cid;

        $("a.btn-fav.active").click();
    }

    $("select#orderform-category").trigger("change");

    // set 500ms
    setTimeout(function () {
        $("select#orderform-service option:not([remove='false'])").each(function () {
            let service_id = $(this).val();
            if (getCookie("favorite_service_" + service_id)) {
                $(this).attr("remove", "false");
            } else {
                $(this).attr("remove", "true");
            }
        });
        $("select#orderform-service option[remove='true']").remove();
        $("select#orderform-service").trigger("change");
    }, 500);
});

$("select#orderform-category").change(function () {
    if ($("a.btn-fav.active").length > 0) {
        setTimeout(function () {
            $("select#orderform-service option:not([remove='false'])").each(function () {
                let service_id = $(this).val();
                if (getCookie("favorite_service_" + service_id)) {
                    $(this).attr("remove", "false");
                } else {
                    $(this).attr("remove", "true");
                }
            });
            $("select#orderform-service option[remove='true']").remove();
            $("select#orderform-service").trigger("change");
			
        }, 100);
    }
    let icon = $(this).find("option:selected").attr("data-icon");
    setTimeout(function () {
        $("select#orderform-service option").attr("data-icon", icon);
        $("select#orderform-service").trigger("change");
    }, 10);
});

setTimeout(function () {
    let icon = $("select#orderform-service").find("option:selected").attr("data-icon");
    $("select#orderform-service option").attr("data-icon", icon);
    $("select#orderform-service").trigger("change");
}, 100);


$("button.favorite").click(function () {
    let service_id = $(this).attr("data-service-id");
    $(this).toggleClass("active");

    // add to favorite
    if ($(this).hasClass("active")) {
        // setcookie
        setCookie("favorite_service_" + service_id, service_id, 365);
    } else {
        // remove cookie
        setCookie("favorite_service_" + service_id, service_id, -1);
    }
});

$("ul.platforms li button").click(function () {
    $("ul.platforms li button").removeClass("active");
    $(this).toggleClass("active");

    let platform = $(this).attr("data-platform");

    if (platform == "all") {
        $(".si-header").show();
        $(".service-item").show();
        $(".category-card").show();
    } else if (platform == "fav") {
        $(".category-card").show();
        $(".si-header").hide();
        $(".service-item:not(.mb-4)").hide();
        $(".service-item[data-fav='true']").show();
    } else {
        $(".si-header").show();
        $(".service-item").show();
        $(".category-card").hide();
        $(".category-card[data-platform='" + platform + "']").show();
    }
});

$("select#orderform-platform").change(function () {
    let val = $(this).val().replaceAll(' ', '').replaceAll('\n', '').replaceAll('\r', '');
    $(".nwo-cat-btn[data-change-cat='" + val + "']").click();

    setTimeout(function () {
        let icon = $("select#orderform-service").find("option:selected").attr("data-icon");
        $("select#orderform-service option").attr("data-icon", icon);
        $("select#orderform-service").trigger("change");
    }, 10);
});

if ($(".service-item").length > 0) {
    $(".service-item").each(function () {
        let service_id = $(this).attr("data-service-id");
        if (getCookie("favorite_service_" + service_id)) {
            $(this).find(".favorite").addClass("active");
            $(this).attr("data-fav", "true");
        } else {
            $(this).attr("data-fav", "false");
        }
    });
}

const filterServicesInput = document.getElementById('filterServicesInput');
if (filterServicesInput) {
    const serviceTitle = document.querySelectorAll('.si-title');
    const serviceHeads = document.querySelectorAll('.category-card > .card-header');
    const nothingFound = document.querySelector('.nothing-found');
    const searchTextWrite = document.getElementById('search-text-write');

    filterServicesInput.addEventListener('keyup', e => {
        const keyword = e.target.value;
        $('.service-item').each(function () {
            var text = $(this).text().toLowerCase();
            if (text.indexOf(e.target.value.toLowerCase()) == -1) {
                $(this).addClass('hidden');
            } else {
                $(this).removeClass('hidden');
            }
        });

        const catCards = document.querySelectorAll('.category-card');
        [...catCards].forEach(card => {
            const itemsHidden = card.querySelectorAll('.service-item.hidden');
            const items = card.querySelectorAll('.service-item');
            if (itemsHidden.length == items.length) {
                card.style.display = 'none';
                card.classList.add('empty');
            } else {
                card.style.display = '';
                card.classList.remove('empty');
            }
        })

        const catCardsCount = catCards.length;
        // empty cards
        const emptyCards = document.querySelectorAll('.category-card.empty');
        console.log(emptyCards.length, catCardsCount);
        if (emptyCards.length == catCardsCount) {
            nothingFound.style.display = '';
            searchTextWrite.innerHTML = keyword;
        } else {
            nothingFound.style.display = 'none';
            searchTextWrite.innerHTML = '';
        }
    });
}

function filterService(category) {
    if (category == 'all')
        $('.category-card.hidden').removeClass('hidden');
    else {
        $('.category-card').addClass('hidden');
        $('.category-card[data-category="' + category + '"]').removeClass('hidden');
    }
    removeEmptyCategory();
}

const filterServces = document.getElementById('filterServices');
if (filterServces) {
    filterServces.addEventListener('change', e => {
        filterService(e.target.value);
    });
}

// setcookie, getcookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

$(".js-show-sidebar, .js-close-sidebar").on("click", function() {
    $("aside.sidebar, .overlay").toggleClass("active");
    $("aside.sidebar").removeClass("passive");
});
$(".overlay").on("click", function() {
    $("aside.sidebar, .overlay").removeClass("active");
	$("aside.sidebar").addClass("passive");
});

(function() {
    $("#switch-theme-input").on("change", function() {
        if ($(this).prop("checked")) {
            $("body").addClass("dark");
            localStorage.setItem("darkMode", true);
        } else {
            $("body").removeClass("dark");
            localStorage.setItem("darkMode", false);
        }
    });
})();
(function() {
    $(document).on("click", function(e) {
        var toggle_item = $(e.target).closest(".toggle-item"),
            toggle_head = $(e.target).closest(".toggle-head"),
            action_item = $(e.target).closest(".action-item"),
            action_head = $(e.target).closest(".action-head");
        if (action_item.length) {
            if (action_head.length && action_item.hasClass("active")) return action_item.removeClass("active");
            $(".action-item").removeClass("active");
            return action_item.toggleClass("active");
        }
        if (toggle_head.length && toggle_item.hasClass("active")) return toggle_item.removeClass("active");
        $(".toggle-item, .action-item").removeClass("active");
        toggle_item.toggleClass("active");
    });
})();

const headerScroll = () => {
    if (window.scrollY > 10) {
        document.querySelector('#header').classList.add('fixed');
    } else {
        document.querySelector('#header').classList.remove('fixed');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('#header')) {
        headerScroll();
    }
});

window.addEventListener('scroll', e => {
    headerScroll();
})

function noAuthMenu() {
		$('.b-menu-wrapper').toggleClass('active');
		$('body').toggleClass('stop-body');
}

   function searchID(){
     var service = $('#input_service').val();
     let errorSender = document.getElementById('error_search');
     var errorMsg = ` <div class="alert alert-dismissible alert-danger">
       <button type="button" class="close" data-dismiss="alert">&times;</button>
       The service you are looking for was not found, try another Service ID.
    </div>`;

     try{
       var selectSerCatID = window.modules.siteOrder.services[service].cid;
       } 
       catch(err){     
         errorSender.innerHTML = errorMsg;
       }
       
       let orderCat = document.getElementById('orderform-category');
       let orderSer = document.getElementById('orderform-service');
      
 
         if(selectSerCatID){
           errorSender.innerHTML = '';
           $(function () {
             orderCat.querySelector('[selected]').removeAttribute('selected');
             console.log(selectSerCatID);
             orderCat.querySelector('[value="'+ selectSerCatID +'"]').setAttribute('selected', 'selected');
             orderCat.value = selectSerCatID;
  
             var event = document.createEvent('HTMLEvents');
             event.initEvent('change', true, false);
             orderCat.dispatchEvent(event);
             setTimeout(() => {
                   let controlSel = orderSer.querySelector('[selected]')
                   if (controlSel) {
                      controlSel.removeAttribute('selected');
                   }
                   orderSer.querySelector('[value="'+ service +'"]').setAttribute('selected', 'selected');
                   orderSer.value = service;
                   $('#serv_id').html(service);
                   orderSer.dispatchEvent(event);
  
             }, 500);
          });
         }
   }

var modalOpen = (modalId, data = null) => {
  const modal = document.getElementById(modalId);
  const modalBox = modal.querySelector('.modal-box');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  modal.addEventListener('click', e => {
    if (e.target !== modalBox && !modalBox.contains(e.target)) {
      closeModal();
    }
  });

  const modalCloseBtn = modal.querySelector('.m-close');
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', e => {
      closeModal();
    })
  }

  if (data != null) {
    Object.keys(data).forEach(key => {
      const el = document.getElementById(key);
      if (el) {
        el.innerHTML = data[key];
      }
    });
  }

}

const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  makeToast('Successfully copied!')
};

var toastTime;

function makeToast(text = null, timeOut=4000) {
  $('.toast-text').html(text)
  $('.bs-toast').fadeIn(300);

  toastTime = setTimeout(() => {
    $('.bs-toast').fadeOut(300);
  }, timeOut);
}

function removeToast() {
  $('.bs-toast').fadeOut(300);
  clearTimeout(toastTime);
}

function setAmount(val) {
    var setamount = document.getElementById("amount");
    setamount.value = val
}


$("#orderform-service").change(function () {
    service_id = $(this).val();
    $("#s_id").text(service_id);

    description = window.modules.siteOrder.services[service_id].description
    $("#s_desc").html(description);

    name = window.modules.siteOrder.services[service_id].name
    $("#s_name").html(name);
  
    console.log($("#s_time").text());
    service_time_text = window.modules.siteOrder.services[service_id].average_time
    $("#s_time").text(service_time_text);
    $('#s_time').val($('#s_time').text());  
})

const newsDrawer = document.querySelector('.basket-drawer');

if (newsDrawer) {
  const newsDrawerToggle = document.querySelector('.basket-drawer-toggle');
  const newsDrawerClose = document.querySelector('.basket-header-close');
  const newsDrawerOverlay = document.querySelector('.basket-overlay');


  newsDrawerToggle.addEventListener('click', e => {
    newsDrawer.style.display = 'block';
    setTimeout(() => { 
      newsDrawer.style.transform = 'translateX(0)';
    }, 10)
    newsDrawerOverlay.style.display = 'block';
  });

  newsDrawerClose.addEventListener('click', e => {
    newsDrawer.style.transform = 'translateX(100%)';
    setTimeout(() => {
      newsDrawer.style.display = 'none';
    }, 300);
    newsDrawerOverlay.style.display = 'none';
  });
}

const useState = (defaultValue) => {
  let value = defaultValue;
  const getValue = () => value
  const setValue = newValue => value = newValue
  return [getValue, setValue];
}

const [gender, setGender] = useState('male');
const genderLocal = localStorage.getItem('gender');
// if gender is undefined
if (genderLocal !== null) {
  setGender(genderLocal);
}

if (localStorage.getItem("color")) {
    $("body").attr("data-color", localStorage.getItem("color"));
} else {
    $("body").attr("data-color", "blue");
}


const genderChangeAvatar = () => {
  const getAllAvatars = document.querySelectorAll(`[alt="Avatar"]`);
  const avatarUrl = gender() == 'female' ? 'https://scrdes.com/assets/avatar_woman.png' : 'https://scrdes.com/assets/avatar.png';
  console.log(gender(), avatarUrl);
  if (getAllAvatars[0]) {
    [...getAllAvatars].forEach(img => {
      img.setAttribute('src', avatarUrl);
    });
  }
}

// document ready
document.addEventListener('DOMContentLoaded', () => {
  genderChangeAvatar();
});

const genderSwitch = document.getElementById('gender-switch');
if (genderSwitch) {
  if (gender() == 'male') {
    genderSwitch.classList.add('gs-male');
  } else {
    genderSwitch.classList.add('gs-female')
  }
  genderSwitch.addEventListener('click', e => {
    if (gender() == 'male') {
      genderSwitch.classList.remove('gs-male');
      genderSwitch.classList.add('gs-female');
      setGender('female');
	  localStorage.setItem("color", "purple");
      $("body").attr("data-color", "purple");
    } else {
      genderSwitch.classList.remove('gs-female');
      genderSwitch.classList.add('gs-male');
      setGender('male');
	   localStorage.setItem("color", "blue");
      $("body").attr("data-color", "blue");
    }

    localStorage.setItem('gender', gender());
    genderChangeAvatar();
  });
}

 
 

var sChatBody = document.getElementsByClassName('schat-chat-body')[0];
if (sChatBody) {
  sChatBody.scrollTo(0, sChatBody.offsetHeight);
}

$('.home-ss-tab').click(function(){
  if($(this).hasClass('active')){
      $(this).find('.ss-tab-content').slideToggle(200);
      $(this).toggleClass('active');
  }else {
      $('.home-ss-tab').removeClass('active');
      $('.home-ss-tab > .ss-tab-content').slideUp(200);
      $(this).find('.ss-tab-content').slideToggle(200);
      $(this).toggleClass('active');
  }
});

function norServices() {
    var app = document.getElementsByTagName("BODY")[0];
    localStorage.platMode = "slistTwo";
    app.classList.add('slistTwo');
    app.classList.remove('slistOne');
    console.log("platMode = " + localStorage.platMode);
}
function devServices() {
    var app = document.getElementsByTagName("BODY")[0];
    localStorage.platMode = "slistOne";
    app.classList.add('slistOne');
    app.classList.remove('slistTwo');
    console.log("platMode = " + localStorage.platMode);
}

setTimeout(function () {
    let icon = $("html select#orderform-service").find("option:selected").attr("data-icon");
    $("select#orderform-service option").attr("data-icon", icon);
    $("select#orderform-service").trigger("change");
}, 100);

$("select#orderform-platform").change(function () {
    let val = $(this).val().replaceAll(' ', '').replaceAll('\n', '').replaceAll('\r', '');
    $(".nwo-cat-btn[data-change-cat='" + val + "']").click();
	$('.nCategory').attr("style", "display:block!important");
    setTimeout(function () {
        let icon = $("select#orderform-service").find("option:selected").attr("data-icon");
        $("select#orderform-service option").attr("data-icon", icon);
        $("select#orderform-service").trigger("change");
    }, 10);
 
});

 $("select#orderform-service").change(function () {
      $('.nCategory').attr("style", "display:block!important");
  });

 $("select#orderform-category").change(function () {
      $('.nServices').attr("style", "display:block!important");
  });

const newOrderCats = document.getElementById('new-order-cats');

if (newOrderCats) {
    const orderFormCats = document.getElementById('orderform-category');
    var realData = orderFormCats.innerHTML;

    const dCatBtns = document.querySelectorAll('.nwo-cat-btn');
    if (dCatBtns[0]) {
        [...dCatBtns].forEach(btn => {
            btn.addEventListener('click', e => {
                const val = btn.getAttribute('data-change-cat');
                const orderFormCats = document.getElementById('orderform-category');
                const options = document.querySelectorAll('#orderform-category-copy option');

                const dCatbtns = document.querySelectorAll('.nwo-cat-btn');
                [...dCatbtns].forEach(bt => {
                    bt.classList.remove('active');
                });
                btn.classList.add('active');

                const newOptions = [];
                [...options].forEach(el => {
                    if (el.innerText.toLowerCase().includes(val.toLowerCase())) {
                        newOptions.push(el);
                    }
                });
                const newOptionsHtml = [];
                [...newOptions].forEach(el => {
                    newOptionsHtml.push(el.outerHTML);
                });
                orderFormCats.innerHTML = newOptionsHtml.join('');

                $('#orderform-category').trigger('change');
            });
        })
    }
    setTimeout(() => {
        const orderFormCopy = document.createElement('select');
        orderFormCopy.setAttribute('id', 'orderform-category-copy');
        orderFormCopy.style.display = 'none';
        orderFormCopy.innerHTML = realData;
        orderFormCats.parentNode.insertBefore(orderFormCopy, orderFormCats);
    }, 100)
}

const htmlcontents = document.querySelector("BODY");
function colorApp() {
    let mode = localStorage.getItem('platMode');
    if (mode) {
        htmlcontents.classList.toggle(localStorage.getItem('platMode'));
    }
}
colorApp();