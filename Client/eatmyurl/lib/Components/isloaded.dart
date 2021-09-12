// ignore_for_file: must_be_immutable

import 'package:eatmyurl/Components/colors.dart';
import 'package:eatmyurl/cubit/eatmyurl_cubit.dart';
import 'package:eatmyurl/data/model/eatmyurl.dart';
import 'package:eatmyurl/data/network_service.dart';
import 'package:eatmyurl/data/repository.dart';
import 'package:eatmyurl/pages/home.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:url_launcher/url_launcher.dart';

URL urlstore = URL();

class ShrinkedPage extends StatelessWidget {
  TextEditingController short = TextEditingController();
  ShrinkedPage({Key? key, required this.url}) : super(key: key);
  final String url;
  final Repository repository = Repository(networkService: NetworkService());
  @override
  Widget build(BuildContext context) {
    BlocProvider.of<EatmyurlCubit>(context).fetchnewurl(url);

    var size = MediaQuery.of(context).size;
    return BlocBuilder<EatmyurlCubit, EatmyurlState>(
      builder: (context, state) {
        if (state is! EatmyurlLoaded) {
          return Center(
              child: CircularProgressIndicator(
            color: mattext,
          ));
        }
        final data = (state).data;
        short.text = data;
        return Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(
                width: size.width * 0.16,
                height: size.height * 0.1,
                child: Padding(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                  child: Container(
                    decoration: BoxDecoration(
                      color: matpinkchip,
                      borderRadius: BorderRadius.circular(30),
                    ),
                    child: Text(
                      'Shorten URL',
                      textAlign: TextAlign.center,
                      style: GoogleFonts.poppins(
                        fontSize: 30,
                        fontWeight: FontWeight.w600,
                        color: matpinkcard,
                      ),
                    ),
                  ),
                ),
              ),
              Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
                child: Text(
                  'Shortened URL',
                  textAlign: TextAlign.center,
                  style: GoogleFonts.poppins(
                    fontSize: 30,
                    fontWeight: FontWeight.w600,
                    color: mattext,
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: SizedBox(
                  width: size.width * 0.8,
                  height: 60,
                  child: TextFormField(
                    controller: short,
                    readOnly: true,
                    style: GoogleFonts.poppins(
                        fontSize: 20,
                        fontWeight: FontWeight.w600,
                        color: hinttext),
                    decoration: InputDecoration(
                      fillColor: textfield,
                      filled: true,
                      border: OutlineInputBorder(
                        borderSide: BorderSide.none,
                        borderRadius: BorderRadius.circular(40),
                      ),
                      hintText: 'Fetching ...',
                      hintStyle: GoogleFonts.poppins(
                          fontSize: 20,
                          fontWeight: FontWeight.w600,
                          color: hinttext),
                    ),
                  ),
                ),
              ),
              Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
                child: SizedBox(
                  width: size.width * .8,
                  child: Padding(
                    padding: const EdgeInsets.symmetric(
                        horizontal: 10, vertical: 10),
                    child: ElevatedButton(
                      style: ButtonStyle(
                        shape: MaterialStateProperty.all(
                          RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(15),
                          ),
                        ),
                        backgroundColor:
                            MaterialStateProperty.resolveWith<Color>(
                          (Set<MaterialState> states) {
                            if (states.contains(MaterialState.pressed)) {
                              return matpinkbuttonpressed;
                            }
                            return matpinkbutton;
                            // Use the component's default.
                          },
                        ),
                      ),
                      onPressed: () {
                        Clipboard.setData(ClipboardData(text: data));
                      },
                      child: Padding(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 10, vertical: 20),
                        child: Center(
                          child: Text(
                            'Copy to Clipboard',
                            style: GoogleFonts.poppins(
                              fontSize: 30,
                              fontWeight: FontWeight.w600,
                              color: mattext,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SizedBox(
                    width: size.width * .08,
                    child: Padding(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 10, vertical: 5),
                      child: ElevatedButton(
                        style: ButtonStyle(
                          shape: MaterialStateProperty.all(
                            RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(15),
                            ),
                          ),
                          backgroundColor:
                              MaterialStateProperty.resolveWith<Color>(
                            (Set<MaterialState> states) {
                              if (states.contains(MaterialState.pressed)) {
                                return matpinkbuttonpressed;
                              }
                              return matpinkbutton;
                              // Use the component's default.
                            },
                          ),
                        ),
                        onPressed: () {
                          String url = 'helloworld.com';
                          launch(url, forceSafariVC: true, forceWebView: false);
                        },
                        child: Padding(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 5, vertical: 20),
                          child: Center(
                            child: Icon(
                              Icons.language_rounded,
                              color: mattext,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 10,
                    ),
                    child: SizedBox(
                      width: size.width * .08,
                      child: Padding(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 10, vertical: 5),
                        child: ElevatedButton(
                          style: ButtonStyle(
                            shape: MaterialStateProperty.all(
                              RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(15),
                              ),
                            ),
                            backgroundColor:
                                MaterialStateProperty.resolveWith<Color>(
                              (Set<MaterialState> states) {
                                if (states.contains(MaterialState.pressed)) {
                                  return matpinkbuttonpressed;
                                }
                                return matpinkbutton;
                                // Use the component's default.
                              },
                            ),
                          ),
                          onPressed: () {},
                          child: Padding(
                            padding: const EdgeInsets.symmetric(
                                horizontal: 5, vertical: 20),
                            child: Center(
                              child: Icon(
                                Icons.qr_code_rounded,
                                color: mattext,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                  SizedBox(
                    width: size.width * .08,
                    child: Padding(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 10, vertical: 5),
                      child: ElevatedButton(
                        style: ButtonStyle(
                          shape: MaterialStateProperty.all(
                            RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(15),
                            ),
                          ),
                          backgroundColor:
                              MaterialStateProperty.resolveWith<Color>(
                            (Set<MaterialState> states) {
                              if (states.contains(MaterialState.pressed)) {
                                return matpinkbuttonpressed;
                              }
                              return matpinkbutton;
                              // Use the component's default.
                            },
                          ),
                        ),
                        onPressed: () {
                          BlocProvider(
                            create: (context) =>
                                EatmyurlCubit(repository: repository),
                            child: const HomePage(),
                          );
                        },
                        child: Padding(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 5, vertical: 20),
                          child: Center(
                            child: Icon(
                              Icons.home_rounded,
                              color: mattext,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              )
            ],
          ),
        );
      },
    );
  }
}
