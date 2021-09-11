part of 'eatmyurl_cubit.dart';

@immutable
abstract class EatmyurlState {}

class EatmyurlInitial extends EatmyurlState {}

class EatmyurlLoading extends EatmyurlState {}

class EatmyurlLoaded extends EatmyurlState {
  late final Map data;
  EatmyurlLoaded({required this.data});
}
