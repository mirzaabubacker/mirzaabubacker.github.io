
var BLOG_ITEMS_PER_PAGE = 5;

var defaultDB = new Firebase("https://mybloggingdb.firebaseio.com");
var blogsRef = defaultDB.child('/blogs/');
var blogAmountRef = defaultDB.child('/blogAmount/');

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBAqXclsER8Y7VxuV7-pYXnv3VHNpSOaHs",
    authDomain: "mybloggingdb.firebaseapp.com",
    databaseURL: "https://mybloggingdb.firebaseio.com",
    storageBucket: "mybloggingdb.appspot.com",
    messagingSenderId: "41834731643"
};


//postBlog('Vinit\'s Blog', 'Dharmik', 'date_goes_here', 'This is where the blog is');

/*defaultDB.ref('/blogs').orderByChild('blogger').limitToFirst(2).once('value').then(function (blog) {
    console.log("Running");
    console.log(blog.val());
});*/

function dothis() {
    getBlogAmount();
};

var increaseBlogAmount = function () {
    blogAmountRef.once('value').then(function(blogAmount) {
        var newBlogAmount = blogAmount.val() + 1;
        console.log(newBlogAmount);
        defaultDB.ref('/blogAmount').set(newBlogAmount);
    })
};

var getBlogAmount = function (){
    blogAmountRef.once('value').then(function(amount) {
        document.getElementById('test').innerHTML = amount;
        console.log(amount.val());
        return amount.val();
    });
};

function getBlog1(amount) {
    var a = "blog"+100;
    blogsRef.set({
        "blog100": {
            blogText: "This is where the blog is",
            blogger: "Vinit"
        }
    })
    blogsRef.orderByKey().equalTo(a).once('value', function(blogList) {
        document.getElementById('test').innerHTML = blogList.val()[a];
        var m = blogList.val()[a];
        alert(m.blogger);
        console.log(blogList.val()[a].blogger);
    });

};




// Interface:
// pushBlog();
// getBlog(var  );

////////////////////////////////////////////////////////////////////////////////////
var getCurrentBlogAmount = -1;


var updateBlogAmount = function() {
};

var postBlog = function () {
    //var updatedBlogAmount = updateBlogAmount();
    //var str = "blog"+updatedBlogAmount;

    blogAmountRef.once('value', function(blogAmount) {
        var updatedAmount = blogAmount.val() + 1;
        defaultDB.update({
            blogAmount: updatedAmount
        });

        var blogID = "blog"+updatedAmount;
        var blogTitle = document.getElementById('titleInput').value;
        var blogDate = document.getElementById('dayInput').value+"-"+
                        document.getElementById('monthInput').value+"-"+
                        document.getElementById('yearInput').value;
        var authorArr = document.getElementsByName('author');
        var blogAuthor = "";
        for (var i = 0; i < authorArr.length; i++) {
            if (authorArr[i].checked) {
                blogAuthor = authorArr[i].value;
                break;
            }
        }

        var blogNumber = updatedAmount;
        var blogString = document.getElementById('blogTextInput').value;


        var blogObject = {};
        blogObject[blogID] = {
            blogTitle: blogTitle.valueOf(),
            blogDate: blogDate.valueOf(),
            blogAuthor: blogAuthor.valueOf(),
            blogString: blogString.valueOf()
        };
        blogsRef.update(blogObject);
        window.location = "http://www.advm.me";
;
    });
};

function initWebpage() {
    blogAmountRef.once('value', function(blogAmount) {
        var blogAmount = blogAmount.val();
        var mostRecentBlogID = "blog"+blogAmount;
        for (var i = 0; i < 5; i++) {
            getBlog("blog"+(blogAmount - i));
            //alert(blogAmount - i);
        }
    });
};


var getAuthorFirstname =function (blogAuthor) {
    var authorLetter = blogAuthor.substring(0, 1);
    if (authorLetter === "A") {
        return "arjun";
    } else if (authorLetter === "D") {
        return "dharmik";
    } else if (authorLetter === "V") {
        return "vinit";
    } else if (authorLetter === "M") {
        return "mirza";
    } else {
        return "ERROR: Author not found.";
    }
}


var printBlog = function(blogTitle, blogDate, blogAuthor, blogString) {
    var body = document.body;
    var firstname = getAuthorFirstname(blogAuthor);
    var blogObjEl = document.createElement("div");
    blogObjEl.className = "container container-"+firstname;

    var randomDiv = document.createElement("div");
    randomDiv.className = "clearfix";
    blogObjEl.appendChild(randomDiv);

    var blogTitleEl = document.createElement("h1");
    blogTitleEl.appendChild(document.createTextNode(blogTitle));

    var blogDateEl = document.createElement("h1");
    blogDateEl.className = "date";
    blogDateEl.appendChild(document.createTextNode(blogDate));

    var authorImgFilename = firstname;
    var authorText1 = '<img style=\"vertical-align:middle;border-radius:50%;filter:grayscale(50%)\" src=\"css/img/'+authorImgFilename+'.jpg\" alt=\"image\">';
    var authorText2 = '<span style=\"margin-left:1%\">'+blogAuthor+'</span>';
    var authorDiv = document.createElement("div");
    authorDiv.innerHTML = authorText1 + authorText2;

    var randomDiv2 = document.createElement("div");
    randomDiv2.className = "hr";


    var blogTextElDiv = document.createElement("div");
    var blogTextElPara = document.createElement("p");
    blogTextElDiv.className = "row text-justify col-md-12";
    blogTextElPara.className = "message";
    blogTextElPara.appendChild(document.createTextNode(blogString));
    blogTextElDiv.appendChild(blogTextElPara);

    blogObjEl.appendChild(blogTitleEl);
    blogObjEl.appendChild(blogDateEl);
    blogObjEl.appendChild(authorDiv);
    blogObjEl.appendChild(randomDiv2);
    blogObjEl.appendChild(blogTextElDiv);

    body.appendChild(blogObjEl);
};

// Check for null objects. testing Required!
var getBlog = function(blogID) {
    blogsRef.orderByKey().equalTo(blogID.valueOf()).once('value', function(blogList) {
        var blogTitle = blogList.child(blogID.valueOf()).val().blogTitle;
        var blogDate = blogList.child(blogID.valueOf()).val().blogDate;
        var blogAuthor = blogList.child(blogID.valueOf()).val().blogAuthor;
        var blogNumber = "blog #"+blogID.substring(4);
        var blogString = blogList.child(blogID.valueOf()).val().blogString;
        printBlog(blogTitle, blogDate, blogAuthor, blogString);
    });
};




// POSTING Blogs

var reassureBeforePost = function() {
    alert("Item Deletion not implemented yet. Please revise before posting. Then, click the Green \"Confirmation Button\"");
    document.getElementById('confirmedPushBtn').style.visibility = "visible";
    document.getElementById('blogPushBtn').style.visibility = "hidden";
}




