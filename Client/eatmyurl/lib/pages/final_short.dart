// ignore_for_file: unused_local_variable, must_be_immutable

import 'package:eatmyurl/Components/colors.dart';
import 'package:eatmyurl/Components/count.dart';
import 'package:eatmyurl/Components/isloaded.dart';
import 'package:eatmyurl/Components/shorten.dart';
import 'package:eatmyurl/cubit/eatmyurl_cubit.dart';
import 'package:eatmyurl/data/network_service.dart';
import 'package:eatmyurl/data/repository.dart';
import 'package:flip_card/flip_card.dart';
import 'package:flip_card/flip_card_controller.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:google_fonts/google_fonts.dart';

var temp = '';

class FinalShrink extends StatefulWidget {
  FinalShrink({Key? key, required this.urlfrom}) : super(key: key);
  String urlfrom;
  sendit() {
    temp = urlfrom;
  }

  @override
  _FinalShrinkState createState() => _FinalShrinkState();
}

FlipCardController _controller = FlipCardController();
Repository repository = Repository(networkService: NetworkService());

class _FinalShrinkState extends State<FinalShrink>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation _colorTween;
  bool ispressed = false;
  bool count = false;

  @override
  void initState() {
    _animationController = AnimationController(
        vsync: this, duration: const Duration(milliseconds: 300));
    _colorTween = ColorTween(begin: matpinkcard, end: matpinkbutton)
        .animate(_animationController);
    print(temp);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;

    return MaterialApp(
      home: Scaffold(
        backgroundColor: background,
        body: SizedBox(
          width: size.width,
          height: size.height,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(
                height: size.height * 0.2,
                width: size.width * .4,
                child: Image.asset('assets/images/logo.png'),
              ),
              Padding(
                padding: const EdgeInsets.all(40),
                child: Row(
                  children: [
                    SizedBox(
                      width: size.width * .3,
                      height: size.height * .6,
                      child: FlipCard(
                        flipOnTouch: false,
                        controller: _controller,
                        direction: FlipDirection.HORIZONTAL, // default
                        front: Container(
                          decoration: BoxDecoration(
                            color: matpinkcard,
                            borderRadius: BorderRadius.circular(40),
                          ),
                          child: BlocProvider(
                            create: (context) =>
                                EatmyurlCubit(repository: repository),
                            child: ShrinkedPage(
                              url: temp,
                            ),
                          ),
                        ),
                        back: Container(
                          decoration: BoxDecoration(
                            color: matpinkcard,
                            borderRadius: BorderRadius.circular(40),
                          ),
                          child: const URLclickCount(),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 100),
                      child: Stack(
                        alignment: Alignment.center,
                        children: [
                          AnimatedBuilder(
                            animation: _colorTween,
                            builder: (context, child) => SvgPicture.asset(
                              'assets/images/switch.svg',
                              width: size.width * .4,
                              height: size.height * .4,
                              color: _colorTween.value,
                            ),
                          ),
                          SizedBox(
                            width: size.width * .15,
                            child: Padding(
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 10, vertical: 10),
                              child: ElevatedButton(
                                style: ButtonStyle(
                                  shape: MaterialStateProperty.all(
                                    RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(10),
                                    ),
                                  ),
                                  backgroundColor: ispressed
                                      ? MaterialStateProperty.resolveWith<
                                          Color>(
                                          (Set<MaterialState> states) {
                                            if (states.contains(
                                                MaterialState.pressed)) {
                                              return matpinkbutton;
                                            }
                                            return matpinkcard;
                                            // Use the component's default.
                                          },
                                        )
                                      : MaterialStateProperty.resolveWith<
                                          Color>(
                                          (Set<MaterialState> states) {
                                            if (states.contains(
                                                MaterialState.pressed)) {
                                              return matpinkbuttonpressed;
                                            }
                                            return matpinkbutton;
                                            // Use the component's default.
                                          },
                                        ),
                                ),
                                onPressed: () {
                                  _controller.toggleCard();
                                  setState(() {
                                    ispressed = !ispressed;
                                  });
                                  if (_animationController.status ==
                                      AnimationStatus.completed) {
                                    _animationController.reverse();
                                  } else {
                                    _animationController.forward();
                                  }
                                },
                                child: Padding(
                                  padding: const EdgeInsets.symmetric(
                                      horizontal: 5, vertical: 5),
                                  child: Center(
                                    child: Text(
                                      'Tap here',
                                      style: GoogleFonts.poppins(
                                          fontSize: 30,
                                          fontWeight: FontWeight.w600,
                                          color: mattext),
                                    ),
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    )
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
