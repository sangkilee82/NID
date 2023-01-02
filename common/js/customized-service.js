
//맞춤형 서비스 스크립트
var num = 0;    //각 문제 순번

//세션 저장
function set_value(name, value) {

    sessionStorage.setItem(name, value);

}

function check_id_result(data) {

    var val = data.d.trim();

}

//저장한 세션 불러오기
function get_value() {

    var a_1 = sessionStorage.getItem('A:1');

    var a_2 = sessionStorage.getItem('A:2');

    var a_3_1 = sessionStorage.getItem('A:3-1');
    var a_3_2 = sessionStorage.getItem('A:3-2');
    var a_3_3 = sessionStorage.getItem('A:3-3');
    var a_3_4 = sessionStorage.getItem('A:3-4');

    var a_4_1 = sessionStorage.getItem('A:4-1');
    var a_4_2 = sessionStorage.getItem('A:4-2');

    var a_5_1 = sessionStorage.getItem('A:5-1');
    var a_5_2 = sessionStorage.getItem('A:5-2');
    var a_5_3 = sessionStorage.getItem('A:5-3');
    var a_5_4 = sessionStorage.getItem('A:5-4');

    var a_6_1 = sessionStorage.getItem('A:6-1');
    var a_6_2 = sessionStorage.getItem('A:6-2');
    var a_6_3 = sessionStorage.getItem('A:6-3');
    var a_6_4 = sessionStorage.getItem('A:6-4');
    var a_6_5 = sessionStorage.getItem('A:6-5');
    var a_6_6 = sessionStorage.getItem('A:6-6');
    var a_6_7 = sessionStorage.getItem('A:6-7');

    var get_value = "A:1 : " + a_1 + "<br/>" +
                    "A:2 : " + a_2 + "<br/>" +
                    "A:3-1 : " + a_3_1 + "<br/>" +
                    "A:3-2 : " + a_3_2 + "<br/>" +
                    "A:3-3 : " + a_3_3 + "<br/>" +
                    "A:3-4 : " + a_3_4 + "<br/>" +
                    "A:4-1 : " + a_4_1 + "<br/>" +
                    "A:4-2 : " + a_4_2 + "<br/>" +
                    "A:5-1 : " + a_5_1 + "<br/>" +
                    "A:5-2 : " + a_5_2 + "<br/>" +
                    "A:5-3 : " + a_5_3 + "<br/>" +
                    "A:5-4 : " + a_5_4 + "<br/>" +
                    "A:6-1 : " + a_6_1 + "<br/>" +
                    "A:6-2 : " + a_6_2 + "<br/>" +
                    "A:6-3 : " + a_6_3 + "<br/>" +
                    "A:6-4 : " + a_6_4 + "<br/>" +
                    "A:6-5 : " + a_6_5 + "<br/>" +
                    "A:6-6 : " + a_6_6 + "<br/>" +
                    "A:6-7 : " + a_6_7 + "<br/>";

    $('.qaWrap').css('display', 'none');
    $('.finalWrap').css('display', '');
    $("#test").html(get_value);

}

//Q.2
function qustion_2() {

    if ($('#age').val() != "") {

        if ($('#group1_1').is(':checked') == true) {

            set_value('A:3-3', '치매조기검진 프로세스, 진단/감별검사 안내');
            get_value();

        } else if ($('#group1_2').is(':checked') == true) {

            get_value();

        } else if ($('#group1_3').is(':checked') == true) {

            fBtn();

        }

    }

}

//급여종류
function question_5_2() {

    if ($('#group5_2_1').is(':checked') == true) {

        set_value('A:6-2', '시설서비스 상세안내, 재가서비스 간략안내');
        get_value();

    } else if ($('#group5_2_2').is(':checked') == true) {

        set_value('A:6-3', '재가서비스 상세 안내, 시설서비스 간략안내');
        set_value('A:6-6', '치매가족휴가제(방문요양/단기보호)');
        get_value();

    } else if ($('#group5_2_3').is(':checked') == true) {

        set_value('A:6-4', '특별현급급여 상세 안내');
        get_value();

    } else if ($('#group5_2_4').is(':checked') == true) {

        set_value('A:6-5', '시설/재가/특별현급급여 서비스 설명');
        set_value('A:6-6', '치매가족휴가제 (방문요양/단기보호)');
        get_value();

    }

}

$(function () {
    $('.btnRadioWrap li button').click(function () {
        $(this).parent().siblings().children().removeClass('checked');
        $(this).addClass('checked');
    })

    $('#start area').click(function () {
        sessionStorage.clear();
        $(this).parent().parent().hide();
        $('.qaWrap').show();
    })

    function fBtn() {
        if (idx == 0) {
            $('.btnPrevList').css('visibility', 'hidden');
        } else {
            $('.btnPrevList').css('visibility', 'visible');
        }
    }

    var idx = $('.qaList > li').index();
    /* 이전 버튼 */
    $('.btnPrevList').click(function () {

        //이전항목 값 불러온다.
        idx = sessionStorage.getItem('idx');
        idx--;
        alert(idx);
        fBtn();
        $('.qaList > li').siblings().css('display', 'none');
        $('.qaList > li:eq(' + idx + ')').css('display', '');
    })

    /* 다음 버튼 */
    $('.btnNextList').click(function () {

        //==================================================================================================================================================================

        //유효성 검사 (버튼)
        var b_one = $('.qaList > li:eq(' + num + ') > ul > li:eq(0) > button').hasClass('checked'); //답변 : 예
        var b_two = $('.qaList > li:eq(' + num + ') > ul > li:eq(1) > button').hasClass('checked'); //답변 : 아니오

        //유효성 검사 (라디오 버튼)
        var radio_one = $('.qaList > li:eq(' + num + ') > div:eq(1) > ol > li:eq(0) > input').is(':checked'); //답변 : 예
        var radio_two = $('.qaList > li:eq(' + num + ') > div:eq(1) > ol > li:eq(1) > input').is(':checked'); //답변 : 아니오

        //첫번째 검사
        var first_a = $('.qaList > li:eq(0) > ul > li:eq(0) > button').hasClass('checked'); //답변 : 예
        var first_b = $('.qaList > li:eq(0) > ul > li:eq(1) > button').hasClass('checked'); //답변 : 아니오

        var eq_5_value_one = $('.qaList > li:eq(' + num + ') > ul > li:eq(0) > button').hasClass('checked'); //답변 :독거
        var eq_5_value_two = $('.qaList > li:eq(' + num + ') > ul > li:eq(1) > button').hasClass('checked'); //답변 :그 외

        //차상위계층
        var eq_4_value_one = $('.qaList > li:eq(4) > ul > li:eq(0) > button').hasClass('checked'); //답변 :독거
        var eq_4_value_two = $('.qaList > li:eq(4) > ul > li:eq(1) > button').hasClass('checked'); //답변 :그 외

        //노인돌봄서비스
        var eq_10_value_one = $('.qaList > li:eq(10) > ul > li:eq(0) > button').hasClass('checked'); //답변 : 예
        var eq_10_value_two = $('.qaList > li:eq(10) > ul > li:eq(1) > button').hasClass('checked'); //답변 : 아니오

        if (b_one == false && b_two == false && num != 2 && first_a == false && first_b == false && eq_5_value_one == false && eq_5_value_two == false) {

            alert('문항에 대한 답변을 선택해 주세요.');
            return false;

        } else if (num == 2 && $('#age').val() == '') {

            alert('나이를 입력해 주세요.');
            return false;

        } else {

            if (first_a == true) { //1번 질문 예
                
                //치매진단/치매약복용 기간 6개월 이상 되는지 (Y)
                if ($('#count_y').hasClass('checked') == true && $('#count_n').hasClass('checked') == false && num == 1) {

                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "./c_service.aspx/Cnt_yn",
                        data: "{ 'cnt_yn': '" + $('#count_y').val() + "' }",
                        success: check_id_result

                    });
                //치매진단/치매약복용 기간 6개월 이상 되는지 (N)
                } else if ($('#count_y').hasClass('checked') == false && $('#count_n').hasClass('checked') == true && num == 1) {


                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "./c_service.aspx/Cnt_yn",
                        data: "{ 'cnt_yn': '" + $('#count_n').val() + "' }",
                        success: check_id_result
                    });

                }

                set_value('A:1', '배회가능어르신인식표, 지문사전등록제, 성년후견인, 헤아림, 동행');
                set_value('last_idx', idx);

                if ($('#age').val() < 60 && $('#age').val() != '' ) {   //60세 미만

                    num = 7;
                    idx = 7;
                    set_value('last_idx', idx);
                    num++;
                    idx++;
                    fBtn();
                    set_value('idx', idx);
                    //장기요양보험 신청여부
                    if (radio_one == true && radio_two == false) {

                        idx = 5;
                        set_value('last_idx', idx);
                        //num++;
                        idx++;
                        fBtn();
                        //장기요양등급 (1,2등급 )
                        if ($('#group5_5').is(':checked') == true || $('#group5_6').is(':checked') == true) {

                            idx = 7;
                            fBtn();
                            set_value('idx', idx);
                            question_5_2();

                        } else if ($('#group5_1_3').is(':checked') == true || $('#group5_1_4').is(':checked') == true || $('#group5_1_5').is(':checked') == true) {  //장기요양등급 (3,4,5등급 )

                            idx = 7;
                            fBtn();
                            set_value('idx', idx);
                            question_5_2();

                        } else if ($('#group5_1_6').is(':checked') == true || $('#group5_1_7').is(':checked') == true || $('#group5_1_8').is(':checked') == true) {  //장기요양등급 (등급외 A,B,C등급 )

                            get_value();

                        }

                    } else if (radio_one == false && radio_two == true) {

                        set_value('A:6-1', '장기요양인정절차 안내, 서비스 내용 간략히 안내');
                        get_value();

                    }

                } else if ($('#age').val() >= 60 && $('#age').val() <= 64 && $('#age').val() != '') { //60세 이상 64세 이하

                   










                    num++;
                    idx++;
                    fBtn();

                    if ($('#age').val() != "") {

                        //소득
                        if ($('#group1_1').is(':checked') == true) {        //소득 100 이하

                            set_value('A:4-1', '치매치료 관리비');
                            idx = 8;
                            num = 8;
                            fBtn();


                        } else if ($('#group1_2').is(':checked') == true) { //소득 100 ~ 150

                            idx = 8;
                            fBtn();

                            //장기요양신청 여부 YES
                            if ($('#group5_5').is(':checked') == true) {

                                idx = 6;
                                fBtn();

                                //장기요양등급 (1,2등급 )
                                if ($('#group5_1_1').is(':checked') == true || $('#group5_1_2').is(':checked') == true) {

                                    idx = 7;
                                    fBtn();
                                    question_5_2();

                                } else if ($('#group5_1_3').is(':checked') == true || $('#group5_1_4').is(':checked') == true || $('#group5_1_5').is(':checked') == true) {  //장기요양등급 (3,4,5등급 )

                                    idx = 7;
                                    fBtn();
                                    question_5_2();

                                } else if ($('#group5_1_6').is(':checked') == true || $('#group5_1_7').is(':checked') == true || $('#group5_1_8').is(':checked') == true) {  //장기요양등급 (등급외 A,B,C등급 )

                                    set_value('A:5-4', '노노케어');
                                    get_value();

                                }

                            } else if ($('#group5_6').is(':checked') == true) {       //장기요양신청여부 NO

                                set_value('A:6-1', '장기요양인정절차 안내, 서비스 내용 간략히 안내');
                                get_value();

                            }

                        }
                    }











































                } else if ($('#age').val() >= 65 && $('#age').val() != '') { //65세 이상

                    num++;
                    idx++;
                    fBtn();

                    if ($('#age').val() != "") {

                        //소득
                        if ($('#group1_1').is(':checked') == true) {        //소득 100 이하

                            set_value('A:4-1', '치매치료 관리비');
                            idx = 4;
                            num = 4;
                            fBtn();

                            //차상위계층 (예)
                            if (eq_4_value_one == true && eq_4_value_two == false) {

                                idx = 5;
                                num = 5;
                                fBtn();

                                //독거인가요(예)
                                if (eq_5_value_one == true && eq_5_value_two == false) {

                                    set_value('A:4-2', '응급안전알림서비스');
                                    idx = 8;
                                    fBtn();
                                    
                                    //장기요양신청 여부 YES
                                    if ($('#group5_5').is(':checked') == true) {

                                        idx = 6;
                                        fBtn();

                                        //장기요양등급 (1,2등급 )
                                        if ($('#group5_1_1').is(':checked') == true || $('#group5_1_2').is(':checked') == true) {

                                            idx = 7;
                                            fBtn();
                                            question_5_2();

                                        } else if ($('#group5_1_3').is(':checked') == true || $('#group5_1_4').is(':checked') == true || $('#group5_1_5').is(':checked') == true) {  //장기요양등급 (3,4,5등급 )

                                            idx = 7;
                                            fBtn();
                                            question_5_2();

                                        } else if ($('#group5_1_6').is(':checked') == true || $('#group5_1_7').is(':checked') == true ) {  //장기요양등급 (등급외 A,B등급 )

                                            idx = 9;
                                            fBtn();

                                            //노인돌봄서비스 신청 (예)
                                            if ($('#group5_3_1').is(':checked') == true) {

                                                idx = 10;
                                                num = 10;
                                                fBtn();

                                                //노인돌봄서비스 이용(예)
                                                if (eq_10_value_one == true && eq_10_value_two == false) {

                                                    //물어봐야된다.
                                                    set_value('A:5-2', '방문요양/주간보호 서비스안내');
                                                    set_value('A:6-7', '치매가족휴가지원서비스(단기보호)');
                                                    get_value();

                                                    //노인돌봄서비스 이용 (아니오)
                                                } else if (eq_10_value_one == false && eq_10_value_two == true) {

                                                    set_value('A:5-3', '노인돌봄종합서비스, 재신청안내(1월 1일) ');
                                                    set_value('A:5-4', '노노케어');
                                                    get_value();

                                                }

                                                //노인돌봄서비스 신청(아니오)
                                            } else if ($('#group5_3_2').is(':checked') == true) {

                                                set_value('A:5-1', '노인돌봄종합서비스, 신청절차 안내');
                                                set_value('A:5-4', '노노케어');
                                                get_value();
                                            }


                                        } else if ($('#group5_1_8').is(':checked') == true) {  //장기요양등급 (등급외 A,B등급)

                                            set_value('A:5-4', '노노케어');
                                            get_value();

                                        }

                                    } else if ($('#group5_6').is(':checked') == true) {       //장기요양신청여부 NO

                                        set_value('A:6-1', '장기요양인정절차 안내, 서비스 내용 간략히 안내');
                                        get_value();

                                    }

                                    //독거인가요(아니오)
                                } else if (eq_5_value_one == false && eq_5_value_two == true) {

                                    idx = 8;
                                    fBtn();
                                    
                                    //장기요양신청 여부 YES
                                    if ($('#group5_5').is(':checked') == true) {

                                        idx = 6;
                                        fBtn();

                                        //장기요양등급 (1,2등급 )
                                        if ($('#group5_1_1').is(':checked') == true || $('#group5_1_2').is(':checked') == true) {

                                            idx = 7;
                                            fBtn();
                                            question_5_2();

                                        } else if ($('#group5_1_3').is(':checked') == true || $('#group5_1_4').is(':checked') == true || $('#group5_1_5').is(':checked') == true) {  //장기요양등급 (3,4,5등급 )

                                            idx = 7;
                                            fBtn();
                                            question_5_2();

                                        } else if ($('#group5_1_6').is(':checked') == true || $('#group5_1_7').is(':checked') == true || $('#group5_1_8').is(':checked') == true) {  //장기요양등급 (등급외 A,B등급 )

                                            idx = 9;
                                            fBtn();

                                            //노인돌봄서비스 신청 (예)
                                            if ($('#group5_3_1').is(':checked') == true) {

                                                idx = 10;
                                                num = 10;
                                                fBtn();

                                                //노인돌봄서비스 이용(예)
                                                if (eq_10_value_one == true && eq_10_value_two == false) {

                                                    //물어봐야된다.
                                                    set_value('A:5-2', '방문요양/주간보호 서비스안내');
                                                    set_value('A:6-7', '치매가족휴가지원서비스(단기보호)');
                                                    get_value();

                                                    //노인돌봄서비스 이용 (아니오)
                                                } else if (eq_10_value_one == false && eq_10_value_two == true) {

                                                    set_value('A:5-3', '노인돌봄종합서비스, 재신청안내(1월 1일) ');
                                                    set_value('A:5-4', '노노케어');
                                                    get_value();

                                                }

                                                //노인돌봄서비스 신청(아니오)
                                            } else if ($('#group5_3_2').is(':checked') == true) {

                                                set_value('A:5-1', '노인돌봄종합서비스, 신청절차 안내');
                                                set_value('A:5-4', '노노케어');
                                                get_value();
                                            }


                                        } else if ($('#group5_1_8').is(':checked') == true) {  //장기요양등급 (등급외 A,B등급)

                                            set_value('A:5-4', '노노케어');
                                            get_value();

                                        }

                                    } else if ($('#group5_6').is(':checked') == true) {       //장기요양신청여부 NO

                                        set_value('A:6-1', '장기요양인정절차 안내, 서비스 내용 간략히 안내');
                                        get_value();

                                    }

                                }

                            //차상위계층 (아니오)
                            } else if (eq_4_value_one == false && eq_4_value_two == true) {

                                idx = 8;
                                fBtn();

                                //장기요양신청 여부 YES
                                if ($('#group5_5').is(':checked') == true) {

                                    idx = 6;
                                    fBtn();

                                    //장기요양등급 (1,2등급 )
                                    if ($('#group5_1_1').is(':checked') == true || $('#group5_1_2').is(':checked') == true) {

                                        idx = 7;
                                        fBtn();
                                        question_5_2();

                                    } else if ($('#group5_1_3').is(':checked') == true || $('#group5_1_4').is(':checked') == true || $('#group5_1_5').is(':checked') == true) {  //장기요양등급 (3,4,5등급 )

                                        idx = 7;
                                        fBtn();
                                        question_5_2();

                                    } else if ($('#group5_1_6').is(':checked') == true || $('#group5_1_7').is(':checked') == true || $('#group5_1_8').is(':checked') == true) {  //장기요양등급 (등급외 A,B등급 )

                                        idx = 9;
                                        fBtn();

                                        //노인돌봄서비스 신청 (예)
                                        if ($('#group5_3_1').is(':checked') == true) {

                                            idx = 10;
                                            num = 10;
                                            fBtn();

                                            //노인돌봄서비스 이용(예)
                                            if (eq_10_value_one == true && eq_10_value_two == false) {

                                                //물어봐야된다.
                                                set_value('A:5-2', '방문요양/주간보호 서비스안내');
                                                set_value('A:6-7', '치매가족휴가지원서비스(단기보호)');
                                                get_value();

                                                //노인돌봄서비스 이용 (아니오)
                                            } else if (eq_10_value_one == false && eq_10_value_two == true) {

                                                set_value('A:5-3', '노인돌봄종합서비스, 재신청안내(1월 1일) ');
                                                set_value('A:5-4', '노노케어');
                                                get_value();

                                            }

                                            //노인돌봄서비스 신청(아니오)
                                        } else if ($('#group5_3_2').is(':checked') == true) {

                                            set_value('A:5-1', '노인돌봄종합서비스, 신청절차 안내');
                                            set_value('A:5-4', '노노케어');
                                            get_value();
                                        }


                                    } else if ($('#group5_1_8').is(':checked') == true) {  //장기요양등급 (등급외 A,B등급)

                                        set_value('A:5-4', '노노케어');
                                        get_value();

                                    }

                                } else if ($('#group5_6').is(':checked') == true) {       //장기요양신청여부 NO

                                    set_value('A:6-1', '장기요양인정절차 안내, 서비스 내용 간략히 안내');
                                    get_value();

                                }


                            }

                        } else if ($('#group1_2').is(':checked') == true) { //소득 100 ~ 150

                            idx = 8;
                            fBtn();

                            //장기요양신청 여부 YES
                            if ($('#group5_5').is(':checked') == true) {

                                idx = 6;
                                fBtn();

                                //장기요양등급 (1,2등급 )
                                if ($('#group5_1_1').is(':checked') == true || $('#group5_1_2').is(':checked') == true) {

                                    idx = 7;
                                    fBtn();
                                    question_5_2();

                                } else if ($('#group5_1_3').is(':checked') == true || $('#group5_1_4').is(':checked') == true || $('#group5_1_5').is(':checked') == true) {  //장기요양등급 (3,4,5등급 )

                                    idx = 7;
                                    fBtn();
                                    question_5_2();

                                } else if ($('#group5_1_6').is(':checked') == true || $('#group5_1_7').is(':checked') == true || $('#group5_1_8').is(':checked') == true) {  //장기요양등급 (등급외 A,B등급 )

                                    idx = 9;
                                    fBtn();

                                    //노인돌봄서비스 신청 (예)
                                    if ($('#group5_3_1').is(':checked') == true) {

                                        idx = 10;
                                        num = 10;
                                        fBtn();

                                        //노인돌봄서비스 이용(예)
                                        if (eq_10_value_one == true && eq_10_value_two == false) {

                                            //물어봐야된다.
                                            set_value('A:5-2', '방문요양/주간보호 서비스안내');
                                            set_value('A:6-7', '치매가족휴가지원서비스(단기보호)');
                                            get_value();

                                            //노인돌봄서비스 이용 (아니오)
                                        } else if (eq_10_value_one == false && eq_10_value_two == true) {

                                            set_value('A:5-3', '노인돌봄종합서비스, 재신청안내(1월 1일) ');
                                            set_value('A:5-4', '노노케어');
                                            get_value();

                                        }

                                    //노인돌봄서비스 신청(아니오)
                                    } else if ($('#group5_3_2').is(':checked') == true) {

                                        set_value('A:5-1', '노인돌봄종합서비스, 신청절차 안내');
                                        set_value('A:5-4', '노노케어');
                                        get_value();
                                    }


                                } else if ($('#group5_1_8').is(':checked') == true) {  //장기요양등급 (등급외 A,B등급)

                                    set_value('A:5-4', '노노케어');
                                    get_value();

                                }

                            } else if ($('#group5_6').is(':checked') == true) {       //장기요양신청여부 NO

                                set_value('A:6-1', '장기요양인정절차 안내, 서비스 내용 간략히 안내');
                                get_value();

                            }

                        } else if ($('#group1_3').is(':checked') == true) { //소득 150%

                            idx = 8;
                            fBtn();

                            //장기요양신청 여부 YES
                            if ($('#group5_5').is(':checked') == true) {

                                idx = 6;
                                fBtn();
                                
                                //장기요양등급 (1,2등급 )
                                if ($('#group5_1_1').is(':checked') == true || $('#group5_1_2').is(':checked') == true) {

                                    idx = 7;
                                    fBtn();
                                    question_5_2();

                                } else if ($('#group5_1_3').is(':checked') == true || $('#group5_1_4').is(':checked') == true || $('#group5_1_5').is(':checked') == true) {  //장기요양등급 (3,4,5등급 )

                                    idx = 7;
                                    fBtn();
                                    question_5_2();

                                } else if ($('#group5_1_6').is(':checked') == true || $('#group5_1_7').is(':checked') == true || $('#group5_1_8').is(':checked') == true) {  //장기요양등급 (등급외 A,B,C등급 )

                                    set_value('A:5-4', '노노케어');
                                    get_value();

                                }

                            } else if ($('#group5_6').is(':checked') == true) {       //장기요양신청여부 NO

                                set_value('A:6-1', '장기요양인정절차 안내, 서비스 내용 간략히 안내');
                                get_value();

                            }

                        }

                    }

                } else {

                    num++;
                    idx++;
                    fBtn();

                }

            } else if (first_b == true) { //1번 질문 아니오

                if (num >= 2) {

                    //66, 70, 74세
                    if ($('#age').val() == 66 || $('#age').val() == 70 || $('#age').val() == 74) {

                        set_value('A:3-4', '생애주기별 검진[건강보험공단]');
                        set_value('A:3-2', '치매조기검진, 치매선별검사 안내[보건소]');
                        num++;
                        idx++;
                        qustion_2();

                    } else if ($('#age').val() >= 60) {

                        set_value('A:3-2', '치매조기검진, 치매선별검사 안내[보건소]');
                        num++;
                        idx++;
                        qustion_2();

                    } else if ($('#age').val() < 60) {

                        set_value('A:3-1', '치매체크 앱');
                        get_value();

                    }

                }

                if (num < 2) num = 2;
                if (idx < 2) idx = 2;
                fBtn();
                set_value('A:2', '치매예방수칙(세대별, 치매예방 운동법, 두근두근뇌운동');

            }

        }

        $('.qaList > li').siblings().css('display', 'none');
        $('.qaList > li:eq(' + idx + ')').css('display', '');
        if (idx >= $('.qaList > li').length) {
            $('.qaWrap').css('display', 'none');
            $('.finalWrap').css('display', '');
        }

    })
    fBtn();

    /* 처음으로 */
    $('.btnFirst a').click(function () {
        $('#start area').parent().parent().show();

        $('.btnRadioWrap li button').removeClass('checked');
        $('#age').val('');      //나이 초기화

        $('.qaList > li:eq(3) > div:eq(1) > ol > li > input').removeAttr('checked');   //가구소득 수준 라디오버튼 해제
        $('.qaList > li:eq(6) > div:eq(1) > ol > li > input').removeAttr('checked');   //노인장기요양 등급 초기화


        $('.qaList > li').siblings().css('display', 'none');
        $('.qaList > li').first().css('display', '');
        
        alert(111);
        idx = 0;
        num = 0;
        return false;
    })
})