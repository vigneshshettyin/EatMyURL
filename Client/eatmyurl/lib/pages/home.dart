// ignore_for_file: unused_local_variable

import 'package:eatmyurl/Components/colors.dart';
import 'package:eatmyurl/Components/shorten.dart';
import 'package:flip_card/flip_card.dart';
import 'package:flip_card/flip_card_controller.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:google_fonts/google_fonts.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

FlipCardController _controller = FlipCardController();

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    return Scaffold(
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
                        child: const ShortenURL(),
                      ),
                      back: Container(
                        decoration: BoxDecoration(
                          color: matpinkcard,
                          borderRadius: BorderRadius.circular(40),
                        ),
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 100),
                    child: Stack(
                      alignment: Alignment.center,
                      children: [
                        SvgPicture.asset(
                          'assets/images/switch.svg',
                          width: size.width * .4,
                          height: size.height * .4,
                          color: matpinkcard,
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
                                backgroundColor:
                                    MaterialStateProperty.resolveWith<Color>(
                                  (Set<MaterialState> states) {
                                    if (states
                                        .contains(MaterialState.pressed)) {
                                      return matpinkbuttonpressed;
                                    }
                                    return matpinkbutton;
                                    // Use the component's default.
                                  },
                                ),
                              ),
                              onPressed: () {
                                _controller.toggleCard();
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
    );
  }
}
