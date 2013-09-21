var Indiz = {
    siteLoaded:false,
    canCyclePage:true,

    init:function() {
        this.handleWindowResize();
        $(window).on("resize",this.handleWindowResize);

        $("#contacts .fluid-grid").slideUp();

        $("a[href='#/contactos']").on("click",function(event){
            event.preventDefault();
            Indiz.showContacts();
        });

        $("#home .buttonContainer button").on("click",function(){
            $('body,html').stop().animate({scrollTop:$(".quemsomos").position().top - Indiz.topOffset()}, 1000,function(){
                Indiz.canCyclePage = true;
            });
        });

        $("#contacts button").on("click",Indiz.hideContacts);
        $('.article').on('inview', Indiz.handleInView);
    },

    handleInView:function(event, isInView, visiblePartX, visiblePartY) {
        var elem = $(this);
        
        if (isInView && Indiz.canCyclePage) {
            if (visiblePartY == 'top') {
                if($(this).attr("href") != undefined && $(this).attr("href") != null){
                     Indiz.app.setLocation("#/"+$(this).attr("href"));
                }
            } else if (visiblePartY == 'bottom') {
                
            } else {
                elem.data('seenTop', true);
                elem.data('seenBottom', true);
            }

            if (elem.data('seenTop') && elem.data('seenBottom')) {                
               
            }
        }
    },

    topOffset:function(){
        return 0;//($("#stickyLogo").outerHeight() + $("#stickyMenu").outerHeight());
    },

    showContacts:function(){
        if($("body").scrollTop() < $("#whoweare").position().top){
           $('body,html').stop().animate({scrollTop:$("#whoweare").position().top}, 1000);
        }

        $("#contacts").fadeIn("fast");
        $("#contacts .fluid-grid").slideDown();
    },

    hideContacts:function(){
        $("#contacts").fadeOut("fast");
        $("#contacts .fluid-grid").slideUp("fast");
    },

    handleWindowResize:function(){
        $("#home").height($(window).height());
        $("#contacts").height($(window).height());
        $(".article").css({"padding-top":($("#stickyLogo").outerHeight() + $("#stickyMenu").outerHeight())+15,"min-height":$(window).height()});
    }
}

Indiz.app = $.sammy(function(){
    
});

Indiz.app.get('#/', function(context){
    Indiz.canCyclePage = false;

    $('body,html').stop().animate({scrollTop:0}, 1000,function(){
        Indiz.canCyclePage = true;
    });
});

Indiz.app.get('#/:page', function(context){
    var page = this.params["page"];

    if(Indiz.siteLoaded == true){
        Indiz.canCyclePage = false;

        $('body,html').stop().animate({scrollTop:$("."+page).position().top - Indiz.topOffset()}, 1000,function(){
            Indiz.canCyclePage = true;
        });
    }else{
      $('body,html').scrollTop($("."+page).position().top - Indiz.topOffset());  
    }

     $(".selected").removeClass("selected");
     $("a[href='#/"+page+"']").addClass("selected");

     if(page == "anossaoferta"){
        $("#stickySubmenu").fadeIn();
     }else{
        $("#stickySubmenu").fadeOut();
     }

     Indiz.siteLoaded = true;
});

Indiz.app.get('#/:page/:subpage', function(context){
    var page = this.params["page"];
    var subpage = this.params["subpage"];

    if(Indiz.siteLoaded == true){
        Indiz.canCyclePage = false;

        $('body,html').stop().animate({scrollTop:$("."+subpage).position().top - Indiz.topOffset()}, 1000,function(){
            Indiz.canCyclePage = true;
        });
    }else{
      $('body,html').scrollTop($("."+subpage).position().top - Indiz.topOffset());  
    }

    $(".selected").removeClass("selected");
    $("a[href='#/"+page+"']").addClass("selected");
    $("a[href='#/"+page+"/"+subpage+"']").addClass("selected");

    if(page == "anossaoferta"){
        $("#stickySubmenu").fadeIn();
    }else{
        $("#stickySubmenu").fadeOut();
    }

    Indiz.siteLoaded = true;
});

Indiz.app.get('#/:page/:subpage/:innerpage', function(context){
    var page = this.params["page"];
    var subpage = this.params["subpage"];
    var innerpage = this.params["innerpage"];

    if(Indiz.siteLoaded == true){
        Indiz.canCyclePage = false;

        $('body,html').stop().animate({scrollTop:$("."+innerpage).position().top - Indiz.topOffset()}, 1000,function(){
            Indiz.canCyclePage = true;
        });
    }else{
      $('body,html').scrollTop($("."+innerpage).position().top - Indiz.topOffset());  
    }

    $(".selected").removeClass("selected");
    $("a[href='#/"+page+"']").addClass("selected");
    $("a[href='#/"+page+"/"+subpage+"']").addClass("selected");

    if(page == "anossaoferta"){
        $("#stickySubmenu").fadeIn();
    }else{
        $("#stickySubmenu").fadeOut();
    }

    Indiz.siteLoaded = true;
});

$(function() {
    Indiz.init();
    Indiz.app.run("#/");

    conditionizr({
        debug      : false,
        ieLessThan : {
            active: true,
            version: '9',
            scripts: false,
            styles: false,
            classes: true
        },
        chrome     : { scripts: false, styles:false, classes: true, customScript: false },
        safari     : { scripts: false, styles:false, classes: true, customScript: false },
        opera      : { scripts: false, styles:false, classes: true, customScript: false },
        firefox    : { scripts: false, styles:false, classes: true, customScript: false },
        ie10       : { scripts: false, styles:false, classes: true, customScript: false },
        ie9        : { scripts: false, styles:false, classes: true, customScript: false },
        ie8        : { scripts: false, styles:false, classes: true, customScript: false },
        ie7        : { scripts: false, styles:false, classes: true, customScript: false },
        ie6        : { scripts: false, styles:false, classes: true, customScript: false },
        retina     : { scripts: false, styles:false, classes: true, customScript: false },
        touch      : { scripts: false, styles:false, classes: true, customScript: false },
        mac        : true,
        win        : true,
        x11        : true,
        linux      : true
    });
});