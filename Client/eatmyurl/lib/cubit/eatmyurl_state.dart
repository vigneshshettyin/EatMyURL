part of 'eatmyurl_cubit.dart';

@immutable
abstract class EatmyurlState {}

class EatmyurlInitial extends EatmyurlState {}


class EatmyurlLoaded extends EatmyurlState {
  late final String data;
  EatmyurlLoaded({required this.data});
}
