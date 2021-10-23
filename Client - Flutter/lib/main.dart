import 'package:eatmyurl/Pages/home_screen.dart';
import 'package:eatmyurl/Pages/splash.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Eat my URL',
      theme: ThemeData(
        primarySwatch: Colors.orange,
      ),
      home: Splash(),
    );
  }
}
