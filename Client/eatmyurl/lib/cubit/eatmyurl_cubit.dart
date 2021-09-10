import 'package:bloc/bloc.dart';
import 'package:meta/meta.dart';

part 'eatmyurl_state.dart';

class EatmyurlCubit extends Cubit<EatmyurlState> {
  EatmyurlCubit() : super(EatmyurlInitial());
}
