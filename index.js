/*
 * To be placed on Index Page
 */
const vars = {
    displayName: "display_name",
    meetingEmail: "meeting_email",
    meetingPwd: "meeting_pwd",
    meetingNumber: "meeting_number",
    meetingLang: "meeting_lang",
};

window.addEventListener('DOMContentLoaded', function (e) {
  fetch(FB_ADDRESS)
    .then(function (response) {
      return response.json();
    })
    .then(function (d) {
      document.getElementById(vars.meetingLang).value = navigator.language;
      websdkready(d);
    })
});

function websdkready(d) {
  var testTool = window.testTool;
  if (testTool.isMobileDevice()) {
    vConsole = new VConsole();
  }

  ZoomMtg.preLoadWasm(); // pre download wasm file to save time.

  // some help code, remember mn, pwd, lang to cookie, and autofill.

  var meetingNumber = PERSONAL_ZOOM_MEETING_LINK.match(new RegExp("[0-9]{10}(?=\\?pwd)", "g"))[0];
  var meetingPwd = PERSONAL_ZOOM_MEETING_LINK.match(new RegExp("pwd=[a-zA-Z0-9]+", "g"))[0].replace(/pwd=/, "");

  document.getElementById(vars.displayName).value = new URLSearchParams(window.location.search).get(vars.displayName) || "Anonymous";
  document.getElementById(vars.meetingEmail).value = new URLSearchParams(window.location.search).get(vars.meetingEmail) || "";

  meetingNumber = testTool.getCookie(vars.meetingNumber);
  meetingPwd = testTool.getCookie(vars.meetingPwd);

  if (testTool.getCookie(vars.meetingLang)) {
      document.getElementById(vars.meetingLang).value = testTool.getCookie(vars.meetingLang);
  }
    

  document.getElementById(vars.meetingLang).addEventListener("change", function (e) {
      testTool.setCookie(vars.meetingLang, document.getElementById(vars.meetingLang).value);
      testTool.setCookie("_zm_lang", document.getElementById(vars.meetingLang).value);
    });
  // copy zoom invite link to mn, autofill mn and pwd.
  var tmpMn;
  var tmpPwd;

  tmpMn = meetingNumber;
  tmpPwd = meetingPwd;

  testTool.setCookie(vars.meetingPwd, tmpPwd);
  testTool.setCookie(vars.meetingNumber, meetingNumber);

  var meetingConfig = testTool.getMeetingConfig();

  meetingConfig.name = document.getElementById(vars.displayName).value;
  meetingConfig.email = document.getElementById(vars.meetingEmail).value;

  testTool.setCookie(vars.meetingNumber, meetingConfig.mn);
  testTool.setCookie(vars.meetingPwd, meetingConfig.pwd);

  var signature = ZoomMtg.generateSignature({
    meetingNumber: meetingConfig.mn,
    apiKey: d.pk,
    apiSecret: d.sk,
    role: meetingConfig.role,
    success: function (res) {
      meetingConfig.signature = res.result;
      meetingConfig.apiKey = d.pk;
      var joinUrl = `${MEETING_ROOM_ADDRESS}?` + testTool.serialize(meetingConfig); // Redirect to waiting room
      document.cookie = `zoomJoinUrl=${joinUrl}`;
      window.location = WAITING_ROOM_ADDRESS;
    },
  });
}
