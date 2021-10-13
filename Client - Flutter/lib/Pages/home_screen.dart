import 'package:eatmyurl/Components/click_count.dart';
import 'package:eatmyurl/Components/colors.dart';
import 'package:eatmyurl/Components/shorten_card.dart';
import 'package:flip_card/flip_card.dart';
import 'package:flip_card/flip_card_controller.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:google_fonts/google_fonts.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  FlipCardController _controller = FlipCardController();

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    if (size.width > 720) {
      return Scaffold(
        backgroundColor: background,
        body: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 20),
                child: SizedBox(
                  width: size.width * .5,
                  height: size.height * .2,
                  child: Image.asset('assets/images/logo.png'),
                ),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 80),
                child: SizedBox(
                  height: size.height * .6,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      FlipCard(
                        controller: _controller,
                        flipOnTouch: false,
                        fill: Fill
                            .fillBack, // Fill the back side of the card to make in the same size as the front.
                        direction: FlipDirection.HORIZONTAL, // default
                        front: size.width > 720
                            ? Container(
                                width: size.width * .4,
                                decoration: BoxDecoration(
                                  color: matpinkcard,
                                  borderRadius: BorderRadius.circular(20),
                                ),
                                child: ShortenURL(),
                              )
                            : Container(
                                decoration: BoxDecoration(
                                  color: matpinkcard,
                                  borderRadius: BorderRadius.circular(20),
                                ),
                                child: ShortenURL(),
                              ),
                        back: size.width > 720
                            ? Container(
                                width: size.width * .4,
                                decoration: BoxDecoration(
                                  color: matpinkcard,
                                  borderRadius: BorderRadius.circular(20),
                                ),
                                child: CountClicks(),
                              )
                            : Container(
                                decoration: BoxDecoration(
                                  color: matpinkcard,
                                  borderRadius: BorderRadius.circular(20),
                                ),
                                child: CountClicks(),
                              ),
                      ),
                      Stack(
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
                            height: size.height * .10,
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
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      );
    } else {
      return Scaffold(
        backgroundColor: background,
        body: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 5),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Padding(
                padding:
                    const EdgeInsets.symmetric(vertical: 20, horizontal: 20),
                child: SizedBox(
                  height: size.height * .2,
                  child: Image.asset('assets/images/logo.png'),
                ),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 5),
                child: Center(
                  child: SizedBox(
                    width: size.width * .9,
                    child: FlipCard(
                      controller: _controller,
                      fill: Fill
                          .fillBack, // Fill the back side of the card to make in the same size as the front.
                      direction: FlipDirection.HORIZONTAL, // default
                      front: Container(
                        decoration: BoxDecoration(
                          color: matpinkcard,
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Padding(
                          padding: const EdgeInsets.symmetric(vertical: 10),
                          child: ShortenURL(),
                        ),
                      ),
                      back: Container(
                        decoration: BoxDecoration(
                          color: matpinkcard,
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: CountClicks(),
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      );
    }
  }
}
